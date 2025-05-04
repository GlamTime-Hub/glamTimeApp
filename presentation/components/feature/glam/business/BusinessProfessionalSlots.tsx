import { View, ScrollView } from "react-native";

import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { useBookingSlots } from "@/presentation/hooks";
import { BusinessProfessionalSlotsCarousel } from "./BusinessProfessionalSlotsCarousel";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/presentation/components/ui/alert";
import { Bell } from "@/lib/icons/Icons";
import { BusinessProfessionalSlot } from "./BusinessProfessionalSlot";

export const BusinessProfessionalSlots = () => {
  const {
    availableDays,
    professional,
    currentSlots,
    currentDay,
    onChangeDay,
    onSelectSlot,
  } = useBookingSlots();

  return (
    <View className="flex-1 p-4">
      <Text className="text-center text-lg mb-4 ">
        Selecciona un horario disponible
      </Text>

      <BusinessProfessionalSlotsCarousel
        data={availableDays}
        onChangeDay={onChangeDay}
      />
      <Text className="font-baloo-bold text-center text-2xl my-4">
        {currentDay?.fullDate}
      </Text>
      {currentSlots && currentSlots.length > 0 && (
        <View className="my-4">
          <Text className="text-center text-lg ">
            Horarios disponibles con el professional
          </Text>
          <Text className="font-baloo-bold text-center text-2xl">
            {professional?.user.name}
          </Text>
        </View>
      )}
      <View className="flex-1">
        {currentSlots.length === 0 && (
          <Alert icon={Bell} variant="default" className="max-w-xl ">
            <AlertTitle>
              <Text>Info!</Text>
            </AlertTitle>
            <AlertDescription>
              <Text>No hay horarios disponibles para el día seleccionado.</Text>
            </AlertDescription>
          </Alert>
        )}

        {currentSlots.length > 0 && (
          <ScrollView showsVerticalScrollIndicator={false}>
            {currentSlots.map((slot, index) => (
              <View className="flex" key={index}>
                <BusinessProfessionalSlot
                  slot={slot}
                  callback={() => onSelectSlot(slot)}
                />
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};
