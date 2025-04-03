import { router } from "expo-router";
import { useState } from "react";
import { View, ScrollView, Platform } from "react-native";

import { useBusinessBookingStore } from "@/presentation/store/useBusinessBooking.store";
import { getFullAvailableSlots } from "@/BD/slots";
import { CustomCollapsible } from "@/presentation/components/ui/CustomCollapsible";
import { BusinessProfessionalSlot } from "./BusinessProfessionalSlot";
import { Card, CardContent } from "@/presentation/components/ui/card";
import { Button } from "@/presentation/components/ui/button";
import { Text } from "@/presentation/components/ui/text";

export const BusinessProfessionalSlots = () => {
  const { slot, professional, service, addSlot } = useBusinessBookingStore();
  const [error, setError] = useState(false);

  const slots = getFullAvailableSlots(professional, service);

  const isIOS = Platform.OS === "ios";

  if (slots.length === 0) return <Text>No hay slots disponibles</Text>;

  const onSelectSlot = (slot: any) => {
    addSlot(slot);
  };

  const onContinue = () => {
    if (!slot) {
      setError(true);
      return;
    }
    router.push("/glam/(tabs)/business/detail/booking/confirmation");
  };

  return (
    <View className="flex-auto px-4">
      <Text className="text-center text-xl mt-4 font-bold">A Continuación</Text>
      <Text className="text-center text-lg mb-4 ">
        Selecciona un horario disponible
      </Text>

      {error && (
        <Text className="text-center mb-4 text-red-600 text-md">
          Debe seleccionar un horario antes de continuar
        </Text>
      )}

      <Card className="flex-1 mb-4 ">
        <CardContent className="flex-1">
          <View className=" flex-1">
            <ScrollView showsVerticalScrollIndicator={false}>
              {slots.map((slot: any, index: number) => {
                return (
                  <CustomCollapsible key={index} title={slot.date}>
                    <Card className="flex-1">
                      <CardContent className="p-0">
                        {slot.slots.map((slot: any, index: number) => {
                          return (
                            <BusinessProfessionalSlot
                              key={index}
                              slot={slot}
                              callback={() => onSelectSlot(slot)}
                            />
                          );
                        })}
                      </CardContent>
                    </Card>
                  </CustomCollapsible>
                );
              })}
            </ScrollView>
          </View>
        </CardContent>
      </Card>

      <Button className={isIOS ? "mb-10" : "my-4"} onPress={onContinue}>
        <Text>Continuar</Text>
      </Button>
    </View>
  );
};
