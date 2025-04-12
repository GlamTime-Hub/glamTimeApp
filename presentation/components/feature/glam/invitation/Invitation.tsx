import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { useUserNotificationStore } from "@/presentation/store/use-user-notification.store";
import { Image, View } from "react-native";

export const Invitation = () => {
  const { notification } = useUserNotificationStore();

  const handleAccept = () => {};

  const handleReject = () => {};

  return (
    <View className="flex-1 p-4 flex justify-between">
      <Card>
        <CardContent className="p-0">
          <Image
            source={{
              uri: notification?.business.urlPhoto || "",
            }}
            style={{
              height: 200,
              justifyContent: "flex-end",
              borderTopRightRadius: 5,
              borderTopLeftRadius: 5,
            }}
          />
          <View className="p-6">
            <Text className="font-baloo-bold text-xl">
              {notification?.business.name}
            </Text>
            <Text>Te ha invitado a ser parte de su equipo de trabajo.</Text>
            <Text className="mt-1">
              Una vez aceptada la invitación, estarás en las lista de
              profesionaless y los usuarios podrán reservar tus servicios.
            </Text>
          </View>
        </CardContent>
      </Card>

      <View className="flex gap-2">
        <Button onPress={handleAccept}>
          <Text>Aceptar</Text>
        </Button>
        <Button onPress={handleReject} variant={"destructive"}>
          <Text>Rechazar</Text>
        </Button>
      </View>
    </View>
  );
};
