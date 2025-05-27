import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { useUserNotificationStore } from "@/presentation/store/use-user-notification.store";
import { Redirect } from "expo-router";
import { View } from "react-native";
import { formatTime } from "../../../../utils/format-time.util";
import { Button } from "@/presentation/components/ui/button";

export const BookingCancelledByUserNotification = () => {
  const { notification } = useUserNotificationStore();

  if (!notification) {
    return <Redirect href="/glam/(tabs)/notifications/home" />;
  }

  return (
    <View className="flex-1 justify-between p-4">
      <Card>
        <CardContent className="flex justify-center items-center p-4">
          <Text className="font-baloo-bold text-xl my-2">
            {notification.fromUser.name}
          </Text>
          <Avatar alt="Imagen de profesional">
            <AvatarImage
              source={{
                uri: notification.fromUser.urlPhoto,
              }}
            ></AvatarImage>
            <AvatarFallback>
              <Text>ZN</Text>
            </AvatarFallback>
          </Avatar>
          <View className="my-2">
            <Text numberOfLines={10}>
              Ha cancelado la reserva programada en el salón{" "}
              {notification.meta.business.name} para el día{" "}
              {notification.meta.booking.fullDate}.
            </Text>
          </View>
          <View className="my-2 ">
            <Text className="font-baloo-bold">
              El horario de {formatTime(notification.meta.booking.startTime)} -{" "}
              {formatTime(notification.meta.booking.endTime)} vuelve a estar
              disponible para otros usuarios.
            </Text>
          </View>
        </CardContent>
      </Card>
      <Button>
        <Text className="text-white">Ver reservas</Text>
      </Button>
    </View>
  );
};
