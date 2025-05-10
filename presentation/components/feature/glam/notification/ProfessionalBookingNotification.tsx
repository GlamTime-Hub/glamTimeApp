import { confirmBookingAction } from "@/core/actions/booking/confirm-booking.action";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { CustomDialog } from "@/presentation/components/ui/CustomDialog";
import { Text } from "@/presentation/components/ui/text";
import { useUserNotificationStore } from "@/presentation/store/use-user-notification.store";
import { formatTime } from "@/presentation/utils/format-time.util";
import { useState } from "react";
import { View } from "react-native";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import { useQueryClient } from "@tanstack/react-query";

export const ProfessionalBookingNotification = () => {
  const { notification, setNotification } = useUserNotificationStore();
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  if (!notification) {
    router.push("/glam/(tabs)/notifications/home");
    return null;
  }

  const onConfirm = async () => {
    setLoading(true);

    const confirm = {
      bookingId: notification?.meta.booking.id,
      notificationId: notification?.id,
      to: notification?.fromUser,
      from: notification?.toUser,
      business: notification?.meta.business.id,
      professional: notification?.meta.professional.id,
    };

    await confirmBookingAction(confirm);

    Toast.show({
      type: "success",
      text1: "Reserva confirmada",
      text2: "El cliente ha sido notificado",
    });

    router.push("/glam/(tabs)/notifications/home");

    setNotification(null);

    queryClient.invalidateQueries({ queryKey: ["notifications"] });

    queryClient.invalidateQueries({ queryKey: ["totalNotifications"] });

    setLoading(false);
  };

  const onCancel = () => {};

  return (
    <View className="flex-1 p-4 justify-between">
      <Card>
        <CardContent className="flex flex-col items-center">
          <Text className="text-primary font-baloo-bold my-2 text-xl">
            !Buenas Noticias!
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

          <Text className="text-xl my-2 font-baloo-bold text-primary">
            {notification?.fromUser.name}
          </Text>
          <Text className="text-justify">
            Quiere reservar contigo, revisa la información del servicio y
            confirma para asegurarlo.
          </Text>
          <View className="flex flex-row gap-2 mt-2">
            <Text className="text-primary font-baloo-bold">Salón:</Text>
            <Text>{notification?.meta.business.name}</Text>
          </View>
          <View className="flex flex-row gap-2">
            <Text className="text-primary font-baloo-bold">Servicio:</Text>
            <Text>{notification?.meta.booking.serviceName}</Text>
          </View>
          <View className="flex flex-row gap-2">
            <Text className="text-primary font-baloo-bold">Dia:</Text>
            <Text>{notification?.meta.booking.fullDate}</Text>
          </View>
          <View className="flex flex-row gap-2">
            <Text className="text-primary font-baloo-bold">Hora:</Text>
            <View className="flex flex-row gap-2">
              <Text>{formatTime(notification?.meta.booking.startTime!)}</Text>
              <Text>-</Text>
              <Text>{formatTime(notification?.meta.booking.endTime!)}</Text>
            </View>
          </View>
        </CardContent>
      </Card>

      <View className="gap-2">
        <Button
          variant={"default"}
          onPress={onConfirm}
          className="flex flex-row gap-2"
        >
          {loading && <LoadingIndicator />}
          <Text>Confirmar</Text>
        </Button>
        <CustomDialog
          isIcon={false}
          disabled={loading}
          title={"Cancelar"}
          closeLabel={"Cancelar"}
          buttonVariant={"destructive"}
          callback={() => onCancel()}
        >
          <Text numberOfLines={2}>
            ¿Estás seguro que deseas cancelar la reserva?
          </Text>
        </CustomDialog>
      </View>
    </View>
  );
};
