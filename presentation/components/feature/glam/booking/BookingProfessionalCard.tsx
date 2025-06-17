import { cancelBookingAction } from "@/core/actions/booking/cancel-booking.action";
import { BookingDetail } from "@/core/interfaces/booking-detail.interface";
import useAuthStore from "@/core/store/auth.store";
import { useColorScheme } from "@/lib/useColorScheme";
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
import { useUserStore } from "@/presentation/store/use-user.store";
import { formatDate } from "@/presentation/utils/format-date.util";
import { formatTime } from "@/presentation/utils/format-time.util";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import { completeBookingAction } from "@/core/actions/booking/complete-booking.action";

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

  const { titleColor } = useColorScheme();

  const [loading, setLoading] = useState(false);
  const { session } = useAuthStore();
  const { user } = useUserStore();

  const queryClient = useQueryClient();

  const onCancel = async () => {
    setLoading(true);

    const cancel = {
      to: {
        userAuthId: booking?.professional.userAuthId,
        user: booking?.professional.userId,
      },
      from: {
        userAuthId: session?.user.id,
        user: user?.id,
      },
      business: booking.business.id,
      professional: booking.professional.id,
      bookingId: booking?.id,
    };

    await cancelBookingAction(cancel);

    Toast.show({
      type: "success",
      text1: "Reserva cancelada",
      text2: "El cliente ha sido notificado.",
    });

    router.push("/glam/(tabs)/notifications/home");

    queryClient.invalidateQueries({ queryKey: ["notifications"] });

    queryClient.invalidateQueries({ queryKey: ["totalNotifications"] });

    setLoading(false);
  };

  const onComplete = async () => {
    setLoading(true);

    await completeBookingAction(booking.id);

    Toast.show({
      type: "success",
      text1: "Reserva completada",
      text2: "Servicio completado correctamente.",
    });

    queryClient.invalidateQueries({ queryKey: ["notifications"] });

    queryClient.invalidateQueries({ queryKey: ["totalNotifications"] });

    queryClient.invalidateQueries({ queryKey: ["professional-bookings"] });

    setLoading(false);
  };

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
              <Text className={`font-baloo-bold ${titleColor}`}>Usuario:</Text>
              <Text className="text-muted-foreground">{booking.user.name}</Text>
            </View>

            <View className="flex-row gap-2">
              <Text className={`font-baloo-bold ${titleColor}`}>Negocio:</Text>
              <Text className="text-muted-foreground">
                {booking.business.name}
              </Text>
            </View>

            <View className="flex-row gap-2">
              <Text className={`font-baloo-bold ${titleColor}`}>Servicio:</Text>
              <Text className="text-muted-foreground">
                {booking.serviceName}
              </Text>
            </View>

            <View className="flex-row gap-2">
              <Text className={`font-baloo-bold ${titleColor}`}>Día:</Text>
              <Text className="text-muted-foreground">{booking.fullDate}</Text>
            </View>

            <View className="flex-row gap-2">
              <Text className={`font-baloo-bold ${titleColor}`}>Hora:</Text>
              <View className="flex-row gap-2">
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
        <CardFooter className="flex-col gap-2">
          {canComplete && (
            <Button
              onPress={onComplete}
              disabled={loading}
              className="w-full flex-row gap-2"
            >
              {loading && <LoadingIndicator />}
              <Text>Completar</Text>
            </Button>
          )}

          {!canComplete && (
            <Button
              onPress={onCancel}
              disabled={loading}
              className="w-full flex-row gap-2"
              variant={"destructive"}
            >
              {loading && <LoadingIndicator />}
              <Text>Cancelar</Text>
            </Button>
          )}
        </CardFooter>
      </Card>
    </View>
  );
};
