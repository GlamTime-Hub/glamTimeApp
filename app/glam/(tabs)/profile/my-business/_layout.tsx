import { Stack } from "expo-router";
import { ThemeToggle } from "@/presentation/components/ThemeToggle";
import { NotificationIcon } from "@/presentation/components/feature";
import { View } from "react-native";
import { useColorScheme } from "@/lib/useColorScheme";

export default function MyBusinessLayout() {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Stack
      initialRouteName="home/index"
      screenOptions={{
        headerTintColor: isDarkColorScheme ? "white" : "black",
        headerRight: () => (
          <View className="flex-row items-center  relative -mr-1">
            <NotificationIcon />
            <ThemeToggle />
          </View>
        ),
      }}
    >
      <Stack.Screen
        name="home/index"
        options={{
          headerTitleAlign: "center",
          title: "Mis Negocios",
        }}
      />

      <Stack.Screen
        name="detail/[id]"
        options={{
          headerTitleAlign: "center",
          title: "Gestiona tu negocio",
        }}
      />

      <Stack.Screen
        name="business-profile/[id]"
        options={{
          headerTitleAlign: "center",
          title: "Perfil del negocio",
        }}
      />

      <Stack.Screen
        name="my-reviews/[id]"
        options={{
          headerTitleAlign: "center",
          title: "Reseñas del negocio",
        }}
      />

      <Stack.Screen
        name="location/index"
        options={{
          headerTitleAlign: "center",
          title: "Ubica tu negocio",
        }}
      />
      <Stack.Screen
        name="my-professionals"
        options={{
          headerTitleAlign: "center",
          title: "Mis Profesionales",
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="my-services/[businessId]"
        options={{
          headerTitleAlign: "center",
          title: "Mis Servicios",
        }}
      />
    </Stack>
  );
}
