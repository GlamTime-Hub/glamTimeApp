import { NotificationIcon } from "@/presentation/components/feature";
import { ThemeToggle } from "@/presentation/components/ThemeToggle";
import { Stack } from "expo-router";
import { View } from "react-native";

const LayoutScreen = () => {
  return (
    <Stack
      initialRouteName="home/index"
      screenOptions={{
        headerRight: () => (
          <View className="flex flex-row gap-2 justify-end px-0 relative -right-2">
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
          title: "Perfil",
        }}
      />

      <Stack.Screen
        name="profile-detail/index"
        options={{
          headerTitleAlign: "center",
          title: "Detalle Perfil",
        }}
      />

      <Stack.Screen
        name="my-business"
        options={{
          headerTitleAlign: "center",
          title: "Mis Negocios",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="my-reviews/index"
        options={{
          headerTitleAlign: "center",
          title: "Mis Reseñas",
          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="reviews-received/index"
        options={{
          headerTitleAlign: "center",
          title: "Reseñas recibidas",
        }}
      />

      <Stack.Screen
        name="notifications/index"
        options={{
          headerTitleAlign: "center",
          title: "Gestionar Notificaciones",
        }}
      />

      <Stack.Screen
        name="my-plan/index"
        options={{
          headerTitleAlign: "center",
          title: "Mi Plan",
        }}
      />

      <Stack.Screen
        name="contact/index"
        options={{
          headerTitleAlign: "center",
          title: "Contacto",
          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="help-support/index"
        options={{
          headerTitleAlign: "center",
          title: "Ayuda y soporte",
          presentation: "modal",
        }}
      />

      <Stack.Screen
        name="my-schedule/index"
        options={{
          headerTitleAlign: "center",
          title: "Mis horarios",
        }}
      />

      <Stack.Screen
        name="legal-privacity/terms/index"
        options={{
          headerTitleAlign: "center",
          title: "Terminos y condiciones",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="legal-privacity/privacy/index"
        options={{
          headerTitleAlign: "center",
          title: "Politica de privacidad",
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default LayoutScreen;
