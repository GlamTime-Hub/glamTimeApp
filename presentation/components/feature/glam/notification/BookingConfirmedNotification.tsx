import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { useUserNotificationStore } from "@/presentation/store/use-user-notification.store";
import { Redirect, router } from "expo-router";
import { View } from "react-native";

export const BookingConfirmedNotification = () => {
  const { notification } = useUserNotificationStore();

  if (!notification) {
    return <Redirect href="/glam/(tabs)/notifications/home" />;
  }

  return (
    <View className="p-4">
      <Card>
        <CardContent className="flex flex-col items-center">
          <Text className="text-primary font-baloo-bold my-2 text-xl">
            Reserva confirmada!!!
          </Text>
          <Avatar alt="Imagen de profesional">
            <AvatarImage
              source={{
                uri: notification?.fromUser.urlPhoto,
              }}
            ></AvatarImage>
            <AvatarFallback>
              <Text>ZN</Text>
            </AvatarFallback>
          </Avatar>
          <Text className="text-xl my-2 font-baloo-bold text-primary text-center">
            {notification?.fromUser.name}
          </Text>
          <Text className="text-justify">
            Ha confirmado tu reserva, puedes ver los detalles en la sección de
            Mis Reservas.
          </Text>
          <Button
            className="mt-2"
            onPress={() => router.push("/glam/(tabs)/booking")}
          >
            <Text>Ir a mis reservas</Text>
          </Button>
        </CardContent>
      </Card>
    </View>
  );
};
