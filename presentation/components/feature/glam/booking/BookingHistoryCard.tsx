import { TouchableOpacity, View } from "react-native";

import { BookingDetail } from "@/core/interfaces/booking-detail.interface";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { formatTime } from "@/presentation/utils/format-time.util";

import { SquarePen } from "@/lib/icons/Icons";
import { useColorScheme } from "@/lib/useColorScheme";
import { router } from "expo-router";

interface Props {
  booking: BookingDetail;
  fromProfessional: number;
}

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

export const BookingHistoryCard = ({ booking, fromProfessional }: Props) => {
  const { titleColor, colorIcons } = useColorScheme();

  const goToBookingHistoryDetail = () => {
    router.navigate({
      pathname: "/glam/(tabs)/booking/history-detail/[bookingId]",
      params: {
        bookingId: booking.id,
        fromProfessional,
      },
    });
  };

  return (
    <View className="flex-1 mb-2">
      <TouchableOpacity onPress={goToBookingHistoryDetail}>
        <Card className="flex-1">
          <CardContent className="flex-1 p-0 relative">
            <View className="flex p-4">
              <Label title="Salón" description={booking.business.name} />

              <Label
                title={fromProfessional ? "Usuario" : "Profesional"}
                description={
                  fromProfessional
                    ? booking.user.name
                    : booking.professional.name
                }
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

            <View className="absolute top-2 right-2">
              <SquarePen className={colorIcons} />
            </View>
          </CardContent>
        </Card>
      </TouchableOpacity>
    </View>
  );
};
