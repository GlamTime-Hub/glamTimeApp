import { Image, View } from "react-native";

import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { useInvitation } from "@/presentation/hooks";

export const Invitation = () => {
  const { notification, loading, loadingReject, handleAccept, handleReject } =
    useInvitation();

  return (
    <View className="flex-1 p-4 flex justify-between">
      <Card>
        <CardContent className="p-0">
          <Image
            source={{
              uri: notification?.meta.business.urlPhoto || "",
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
              {notification?.meta.business.name}
            </Text>
            <Text>Te ha invitado a ser parte de su equipo de trabajo.</Text>
            <Text className="mt-1">
              Una vez aceptada la invitación, estarás en las lista de
              profesionales y los usuarios podrán reservar tus servicios.
            </Text>
          </View>
        </CardContent>
      </Card>

      <View className="flex gap-2">
        <Button
          disabled={loading || loadingReject}
          onPress={handleAccept}
          className="flex flex-row gap-2"
        >
          {loading && <LoadingIndicator />}
          <Text>Aceptar</Text>
        </Button>
        <Button
          disabled={loading || loadingReject}
          onPress={handleReject}
          variant={"destructive"}
        >
          {loadingReject && <LoadingIndicator />}
          <Text>Rechazar</Text>
        </Button>
      </View>
    </View>
  );
};
