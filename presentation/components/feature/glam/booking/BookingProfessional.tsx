import { Card, CardContent } from "@/presentation/components/ui/card";
import { Text } from "@/presentation/components/ui/text";
import { TouchableOpacity, View } from "react-native";

import { ChevronRight } from "@/lib/icons/Icons";
import { router } from "expo-router";

export const BookingProfessional = () => {
  return (
    <View className="flex-1 gap-2 p-4">
      <TouchableOpacity
        onPress={() => router.push("/glam/(tabs)/booking/agenda")}
      >
        <Card>
          <CardContent className="relative py-4">
            <Text className="font-baloo-bold text-xl text-primary">
              Mi Agenda
            </Text>
            <Text>
              Aquí podrás ver todas tus reservas hechas por los usuarios y
              gestionar tu agenda de trabajo como profesional.
            </Text>
            <ChevronRight className="text-primary absolute top-2 right-2" />
          </CardContent>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.push("/glam/(tabs)/booking/home")}
      >
        <Card>
          <CardContent className="relative py-4">
            <Text className="font-baloo-bold text-xl text-primary">
              Mis Reservas
            </Text>
            <Text>
              Aquí podrás ver todas tus reservas hechas como usuario de la
              aplicación.
            </Text>

            <ChevronRight className="text-primary absolute top-2 right-2" />
          </CardContent>
        </Card>
      </TouchableOpacity>
    </View>
  );
};
