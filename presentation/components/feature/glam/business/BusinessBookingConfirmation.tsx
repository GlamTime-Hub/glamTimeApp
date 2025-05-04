import { View } from "react-native";
import { Button } from "@/presentation/components/ui/button";
import { Text } from "@/presentation/components/ui/text";
import { useBusinessBookingStore } from "@/presentation/store/use-business-booking.store";
import { BusinessBookingConfirmationCard } from "../shared/BusinessBookingConfirmationCard";
import { Booking } from "@/core/interfaces/booking.interface";
import { useUserStore } from "@/presentation/store/use-user.store";
import { addNewBookingAction } from "@/core/actions/booking/add-new-booking.action";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { LoadingIndicator } from "../shared/LoadingIndicator";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/presentation/components/ui/alert";
import { AlertTriangle } from "@/lib/icons/Icons";
import { Redirect, router } from "expo-router";

export const BusinessBookingConfirmation = () => {
  const { slot, service, professional, clearBooking } =
    useBusinessBookingStore();
  const { user } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onConfirm = async () => {
    setLoading(true);
    const booking: Booking = {
      professionalId: professional?.id || "",
      businessId: professional?.businessId || "",
      serviceId: service?.service.id || "",
      categoryId: service?.categoryId || "",
      subcategoryId: service?.id || "",
      serviceName: service?.name || "",
      userId: user?.id || "",
      userAuthId: "",
      fullDate: slot?.fullDate || "",
      date: slot?.date || new Date(),
      startTime: slot?.startTime || 0,
      endTime: slot?.endTime || 0,
      status: "pending",
    };

    try {
      await addNewBookingAction(booking);
      Toast.show({
        type: "success",
        text1: "Reserva creada",
        text2: "Tu reserva ha sido creada con exito",
      });
      clearBooking();

      router.push("/glam/(tabs)/booking");
    } catch (error: any) {
      setError(error.message);
    }
    setLoading(false);
  };

  if (!service || !professional || !slot) {
    return <Redirect href="/glam/(tabs)/business/list" />;
  }

  return (
    <View className="flex-1 flex p-4">
      <Text className="my-4 text-center font-baloo-bold text-xl">
        !Todo listo para tu cita!
      </Text>

      <View className="flex items-center mb-4 ">
        <Text className="text-lg">Revisa los detalles de tu reserva</Text>
        <View className="flex flex-row">
          <Text className="text-lg"> y presiona</Text>

          <Text className="font-baloo-bold text-lg"> "Confirmar"</Text>
        </View>
      </View>

      <View className="flex-1">
        <BusinessBookingConfirmationCard
          service={service}
          professional={professional}
          slot={slot}
        />
        {!error && (
          <Text className="text-center font-baloo-bold text-xl mt-4">
            !Nos vemos pronto¡
          </Text>
        )}

        {error && (
          <View>
            <Alert
              icon={AlertTriangle}
              variant="destructive"
              className="max-w-xl"
            >
              <AlertTitle>Info!</AlertTitle>
              <AlertDescription>
                Cita reservada por otro usuario, por favor selecciona otro
                horario.
              </AlertDescription>
            </Alert>
            <Button className="mt-2" onPress={() => router.back()}>
              <Text>Cambiar Reserva</Text>
            </Button>
          </View>
        )}
      </View>

      <Button className="flex flex-row gap-2" onPress={onConfirm}>
        {loading && <LoadingIndicator />}
        <Text>Confirmar</Text>
      </Button>
    </View>
  );
};
