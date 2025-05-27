import { View, ScrollView } from "react-native";
import { useContactForm } from "@/presentation/hooks";
import { Text } from "@/presentation/components/ui/text";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Controller } from "react-hook-form";
import { Input } from "@/presentation/components/ui/input";
import { Textarea } from "@/presentation/components/ui/textarea";
import { Button } from "@/presentation/components/ui/button";
import { LoadingIndicator } from "../shared/LoadingIndicator";

export const ContactForm = () => {
  const { control, errors, loading, handleSubmit, onSubmit } = useContactForm();

  return (
    <View className="flex-1 p-4">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text className="font-baloo-bold text-xl my-2 text-center">
          ¿En qué podemos ayudarte?
        </Text>

        <Card className="py-4">
          <CardContent className="px-4">
            <View className="my-2">
              <Text className="font-baloo-bold mb-1">Asunto</Text>
              <Controller
                control={control}
                name="subject"
                render={({ field: { onChange, value, onBlur } }) => (
                  <Input
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Asunto"
                    maxLength={50}
                    editable={!loading}
                  />
                )}
              />
              {errors.subject && (
                <Text className="text-red-500 text-sm">
                  {errors.subject.message}
                </Text>
              )}
            </View>

            <View className="my-2">
              <Text className="font-baloo-bold mb-1">Descripción</Text>
              <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value, onBlur } }) => (
                  <Textarea
                    className="h-40"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    placeholder="Cuéntanos tu situación"
                    editable={!loading}
                  />
                )}
              />
              {errors.description && (
                <Text className="text-red-500 text-sm">
                  {errors.description.message}
                </Text>
              )}
            </View>
          </CardContent>
        </Card>
      </ScrollView>

      <Button onPress={handleSubmit(onSubmit)} className="flex flex-row gap-2">
        {loading && <LoadingIndicator />}
        <Text>Enviar</Text>
      </Button>
    </View>
  );
};
