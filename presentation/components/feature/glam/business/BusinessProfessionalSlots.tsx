import { View, ScrollView } from "react-native";

import { Text } from "@/presentation/components/ui/text";
import { useBookingSlots } from "@/presentation/hooks";
import { BusinessProfessionalSlotsCarousel } from "./BusinessProfessionalSlotsCarousel";
import { BusinessProfessionalSlot } from "./BusinessProfessionalSlot";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";
import { professionals } from "../../../../../BD/professional.constant";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/presentation/components/ui/avatar";

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
      <ScrollView showsVerticalScrollIndicator={false}>
        {currentSlots && currentSlots.length > 0 && (
          <View className="flex justify-center items-center">
            <Text className="text-center text-lg ">
              Horarios disponibles con el professional
            </Text>
            <Text className="font-baloo-bold text-center text-2xl">
              {professional?.user.name}
            </Text>

            <Avatar alt="Imagen de profesional" size="xl">
              <AvatarImage
                source={{
                  uri: professional?.user.urlPhoto,
                }}
              ></AvatarImage>
              <AvatarFallback>
                <Text>ZN</Text>
              </AvatarFallback>
            </Avatar>
          </View>
        )}
        <View className="flex-1">
          {currentSlots.length === 0 && (
            <CustomAlert
              title="Info!!!"
              description="No hay horarios disponibles para el día seleccionado."
              type="info"
            />
          )}

          {currentSlots.length > 0 && (
            <View>
              {currentSlots.map((slot, index) => (
                <View className="flex" key={index}>
                  <BusinessProfessionalSlot
                    slot={slot}
                    callback={() => onSelectSlot(slot)}
                  />
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};
