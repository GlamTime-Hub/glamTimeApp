import { Image, ScrollView, View } from "react-native";

import { Text } from "@/presentation/components/ui/text";
import { useBookingHistoryDetail } from "@/presentation/hooks/use-booking-history-detail.hook";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { useColorScheme } from "@/lib/useColorScheme";
import { formatTime } from "@/presentation/utils/format-time.util";
import { ReviewCard } from "../shared/ReviewCard";
import { Button } from "@/presentation/components/ui/button";
import { BookingHistoryDetailLoading } from "./BookingHistoryDetailLoading";
import { router } from "expo-router";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";

const Label = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const { titleColor } = useColorScheme();

  return (
    <View className="flex flex-row gap-2">
      <Text className={`text-primary font-baloo-bold ${titleColor}`}>
        {title}:
      </Text>
      <Text className="text-muted-foreground">{description}</Text>
    </View>
  );
};

export const BookingHistoryDetail = () => {
  const { booking, isLoading, fromProfessional } = useBookingHistoryDetail();

  const { titleColor } = useColorScheme();

  if (isLoading) {
    return <BookingHistoryDetailLoading />;
  }

  if (!booking) {
    return (
      <View className="p-4">
        <CustomAlert
          title="Info!!!"
          description="Detalle de reserva no disponible."
          type="info"
        />
      </View>
    );
  }

  const onBookingAgain = () => {
    router.navigate({
      pathname: "/glam/(tabs)/business/detail/home/[id]",
      params: {
        id: booking.business.id,
      },
    });
  };

  return (
    <View className="p-4  flex-1">
      <ScrollView showsVerticalScrollIndicator={false}>
        <Card>
          <CardContent className="p-2">
            <Image
              source={{
                uri: booking.business?.urlPhoto,
              }}
              style={{
                height: 150,
                justifyContent: "flex-end",
                borderTopRightRadius: 8,
                borderTopLeftRadius: 8,
              }}
            />

            <View className="flex py-2">
              <Label title="Salón" description={booking.business.name} />

              <Label
                title="Profesional"
                description={booking.professional.name}
              />
              <Label title="Servicio" description={booking.serviceName} />
              <Label title="Día" description={booking.fullDate} />

              <View className="flex flex-row gap-2">
                <Text className={`text-primary font-baloo-bold ${titleColor}`}>
                  Hora:
                </Text>
                <View className="flex flex-row gap-2">
                  <Text className="text-muted-foreground">
                    {formatTime(booking.startTime)}
                  </Text>
                  <Text className="text-muted-foreground">-</Text>
                  <Text className="text-muted-foreground">
                    {formatTime(booking.endTime)}
                  </Text>
                </View>
              </View>
            </View>
          </CardContent>
        </Card>
        {booking.hasProfessionalReview && booking.professionalReview && (
          <View className="my-2 flex-1 ">
            <Text className={`font-baloo-bold ${titleColor}`}>
              Reseña al Profesional
            </Text>
            <ReviewCard
              userUrlPhoto={booking.user.urlPhoto}
              rating={booking.professionalReview!.rating}
              userName={booking.user.name}
              comment={booking.professionalReview!.review}
            />
          </View>
        )}

        {booking.hasBusinessReview && booking.businessReview && (
          <View className="flex-1 ">
            <Text className={`font-baloo-bold ${titleColor}`}>
              Reseña al Negocio
            </Text>
            <ReviewCard
              userUrlPhoto={booking.user.urlPhoto}
              rating={booking.businessReview!.rating}
              userName={booking.user.name}
              comment={booking.businessReview!.review}
            />
          </View>
        )}

        {fromProfessional === "0" && (
          <Button onPress={onBookingAgain}>
            <Text>Reservar de nuevo</Text>
          </Button>
        )}
      </ScrollView>
    </View>
  );
};
