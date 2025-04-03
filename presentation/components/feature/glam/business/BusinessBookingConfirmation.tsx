import { Platform, View } from "react-native";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";
import { Button } from "@/presentation/components/ui/button";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { useBusinessBookingStore } from "@/presentation/store/useBusinessBooking.store";
import { formatTime } from "@/presentation/utils/format-time.util";
import { cn } from "@/lib/util";
import { BusinessBookingConfirmationCard } from "../shared/BusinessBookingConfirmationCard";

export const BusinessBookingConfirmation = () => {
  const { slot, service, professional } = useBusinessBookingStore();

  const isIOS = Platform.OS === "ios";

  const onConfirm = () => {
    //se hace el llamado al backend para guardar
    // y se limpa el store del booking
  };

  return (
    <View className="flex-1 flex px-4">
      <Text className="my-4 text-center font-bold text-xl">
        !Todo listo para tu cita!
      </Text>

      <View className="flex items-center mb-4 ">
        <Text className="text-lg">Revisa los detalles de tu reserva</Text>
        <View className="flex flex-row">
          <Text className="text-lg"> y presiona</Text>

          <Text className="font-bold text-lg"> "Confirmar"</Text>
        </View>
      </View>

      <View className="flex-1">
        <BusinessBookingConfirmationCard
          service={service}
          professional={professional}
          slot={slot}
        />
        <Text className="text-center font-bold text-xl mt-4">
          !Nos vemos pronto¡
        </Text>
      </View>

      <Button onPress={onConfirm} className={cn(isIOS ? "mb-10" : "mb-5")}>
        <Text>Confirmar</Text>
      </Button>
    </View>
  );
};
