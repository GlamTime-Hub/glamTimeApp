import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { useInvitation } from "@/presentation/hooks";
import { Redirect } from "expo-router";
import { Image, View } from "react-native";
import { LoadingIndicator } from "../shared/LoadingIndicator";

export const InvitationNotification = () => {
  const { notification, loading, loadingReject, handleAccept, handleReject } =
    useInvitation();

  if (!notification) {
    return <Redirect href="/glam/(tabs)/notifications/home" />;
  }

  return (
    <View className="flex-1 p-4 justify-between">
      <Card>
        <CardContent className="p-0">
          <Image
            source={{
              uri: notification.meta.business.urlPhoto,
            }}
            style={{
              height: 200,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            }}
          />
          <View className="p-4">
            <Text className="text-primary py-2">
              {notification.meta.business.name}
            </Text>
            <Text>
              Te ha invitado a ser parte de tu equipo de trabajo, una vez
              aceptada la invitación, estarás en la lista de profesionales y los
              usuarios podrán reservar turnos contigo.
            </Text>
          </View>
        </CardContent>
      </Card>

      <View className="gap-2">
        <Button
          className="flex-row gap-2"
          onPress={handleAccept}
          disabled={loadingReject}
        >
          {loading && <LoadingIndicator />}
          <Text>Aceptar</Text>
        </Button>
        <Button
          className="flex-row gap-2"
          onPress={handleReject}
          disabled={loading}
          variant={"destructive"}
        >
          {loadingReject && <LoadingIndicator />}

          <Text>Rechazar</Text>
        </Button>
      </View>
    </View>
  );
};
