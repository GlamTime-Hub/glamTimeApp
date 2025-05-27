import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { Textarea } from "@/presentation/components/ui/textarea";
import { useBusinessFeedback } from "@/presentation/hooks/use-business-feedback";
import { Controller } from "react-hook-form";
import { Image, ScrollView, View } from "react-native";
import StarRating from "react-native-star-rating-widget";
import { FeedbackLoading } from "./FeedbackLoading";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { useProfessionalFeedback } from "@/presentation/hooks";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";

export const ProfessionalFeedback = () => {
  const {
    professional,
    isLoading,
    loading,
    errorRating,
    errors,
    control,
    rating,
    setRating,
    onSubmit,
    handleSubmit,
  } = useProfessionalFeedback();

  console.log("professional", professional);

  if (isLoading) {
    return <FeedbackLoading />;
  }

  return (
    <View className="flex-1 justify-between p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card>
          <CardContent className="py-4">
            <View className="items-center justify-center">
              <Avatar alt="Imagen de profesional" size="xl">
                <AvatarImage
                  source={{
                    uri: professional?.user.urlPhoto,
                  }}
                ></AvatarImage>
                <AvatarFallback>
                  <Text>ZN</Text>
                </AvatarFallback>
              </Avatar>
            </View>

            <Text className="font-baloo-bold text-primary my-2">
              ¿Que tal tu experiencia con {professional?.user.name} ?
            </Text>
            <View className="mb-2">
              <Controller
                control={control}
                name="feedback"
                render={({ field: { onChange, value, onBlur } }) => (
                  <Textarea
                    className="h-32"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Dejanos un comentario"
                    editable={!loading}
                  />
                )}
              />
              {errors.feedback && (
                <Text className="text-red-500 text-sm">
                  {errors.feedback.message}
                </Text>
              )}
            </View>

            <Text className="font-baloo-bold text-primary">
              ¿Cómo calificarías el servicio?
            </Text>

            <StarRating
              starSize={40}
              emptyColor="#e0e0e0"
              rating={rating}
              starStyle={{ marginHorizontal: 0 }}
              onChange={setRating}
            />

            {errorRating && (
              <Text className="text-red-500 text-sm">
                Agrega una calificación.
              </Text>
            )}
          </CardContent>
        </Card>
      </ScrollView>

      <Button className="flex-row gap-2" onPress={handleSubmit(onSubmit)}>
        {loading && <LoadingIndicator />}
        <Text>Enviar</Text>
      </Button>
    </View>
  );
};
