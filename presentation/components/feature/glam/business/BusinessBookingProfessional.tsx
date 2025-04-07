import { ScrollView, View } from "react-native";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

import { Text } from "@/presentation/components/ui/text";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { BusinessProfessionalCard } from "./BusinessProfessionalCard";
import { Button } from "@/presentation/components/ui/button";
import { professionals } from "@/BD/professional.constant";
import { useBusinessBookingStore } from "@/presentation/store/use-business-booking.store";

export const BusinessBookingProfessional = () => {
  const { professional, addProfessional } = useBusinessBookingStore();

  const onSelectProfessional = (professional: any) => {
    addProfessional(professional);
  };

  const onContinue = () => {
    if (!professional) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Debes seleccionar un profesional para tu cita",
      });
      return;
    }

    router.push("/glam/(tabs)/business/detail/booking/slots");
  };

  return (
    <View className="flex-1 p-6">
      <Text className="text-center font-bold text-2xl">
        Un paso más y tu reserva estará lista
      </Text>
      <Text className="text-center font-bold text-xl my-2">
        ¿Con quién quieres tu cita?
      </Text>

      <Card className="flex-1">
        <CardContent className="gap-4 native:gap-2 px-0">
          <ScrollView showsVerticalScrollIndicator={false}>
            {professionals.map((prof) => (
              <BusinessProfessionalCard
                key={prof.id}
                professional={prof}
                callback={() => onSelectProfessional(prof)}
                selecteable={true}
                selected={professional && professional.id === prof?.id}
              />
            ))}
          </ScrollView>
        </CardContent>
      </Card>
      <Button className="mt-4" onPress={onContinue}>
        <Text>Continuar</Text>
      </Button>
    </View>
  );
};
