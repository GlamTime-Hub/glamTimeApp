import { useColorScheme } from "@/lib/useColorScheme";
import { BusinessFavoriteIcon } from "@/presentation/components/feature/glam/shared/BusinessFavoriteIcon";
import { ProfessionalFavoriteIcon } from "@/presentation/components/feature/glam/shared/ProfessionalFavoriteIcon";
import { Stack } from "expo-router";
import { View } from "react-native";

const DetailScreen = () => {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Stack
      initialRouteName="home/[id]"
      screenOptions={{
        headerTintColor: isDarkColorScheme ? "white" : "black",
      }}
    >
      <Stack.Screen
        name="home/[id]"
        options={{
          headerTitleAlign: "center",
          title: "Detalle",
          headerRight: () => (
            <View className="flex-row items-center  relative -mr-1">
              <BusinessFavoriteIcon />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="booking"
        options={{
          headerTitleAlign: "center",
          title: "Reserva tu Cita",
        }}
      />
      <Stack.Screen
        name="comments/[id]"
        options={{
          headerTitleAlign: "center",
          presentation: "modal",
          title: "Comentarios",
          headerRight: () => null,
        }}
      />
      <Stack.Screen
        name="professional-detail/[professionalId]"
        options={{
          headerTitleAlign: "center",
          title: "Perfil del Profesional",
          headerRight: () => (
            <View className="flex-row items-center  relative -mr-1">
              <ProfessionalFavoriteIcon />
            </View>
          ),
        }}
      />
    </Stack>
  );
};

export default DetailScreen;
