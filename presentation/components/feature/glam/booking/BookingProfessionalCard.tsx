import { BookingDetail } from "@/core/interfaces/booking-detail.interface";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { Button } from "@/presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { formatDate } from "@/presentation/utils/format-date.util";
import { formatTime } from "@/presentation/utils/format-time.util";
import { View } from "react-native";

export const BookingProfessionalCard = ({
  booking,
}: {
  booking: BookingDetail;
}) => {
  const currentDate = new Date();
  const currentFormatDate = formatDate(currentDate);
  const currentHour = currentDate.getHours() + currentDate.getMinutes() / 60;

  const canComplete =
    currentFormatDate === booking.fullDate && currentHour > booking.startTime;

  return (
    <View className="flex-1 mb-2">
      <Card>
        <CardContent className="flex-row py-4 gap-2  items-center">
          <Avatar alt="Imagen de profesional" size="xl">
            <AvatarImage
              source={{
                uri: booking.user.urlPhoto,
              }}
            ></AvatarImage>
            <AvatarFallback>
              <Text>ZN</Text>
            </AvatarFallback>
          </Avatar>

          <View>
            <View className="flex-row gap-2">
              <Text className="font-baloo-bold text-primary">Usuario:</Text>
              <Text>{booking.user.name}</Text>
            </View>

            <View className="flex-row gap-2">
              <Text className="font-baloo-bold text-primary">Negocio:</Text>
              <Text>{booking.business.name}</Text>
            </View>

            <View className="flex-row gap-2">
              <Text className="font-baloo-bold text-primary">Servicio:</Text>
              <Text>{booking.serviceName}</Text>
            </View>

            <View className="flex-row gap-2">
              <Text className="font-baloo-bold text-primary">Día:</Text>
              <Text>{booking.fullDate}</Text>
            </View>

            <View className="flex-row gap-2">
              <Text className="font-baloo-bold text-primary">Hora:</Text>
              <View className="flex-row gap-2">
                <Text>{formatTime(booking.startTime)}</Text>
                <Text>-</Text>
                <Text>{formatTime(booking.endTime)}</Text>
              </View>
            </View>
          </View>
        </CardContent>
        <CardFooter className="w-full flex-row">
          {canComplete && (
            <Button>
              <Text>Completar</Text>
            </Button>
          )}

          <Button variant={"destructive"} className="w-full">
            <Text>Cancelar</Text>
          </Button>
        </CardFooter>
      </Card>
    </View>
  );
};
