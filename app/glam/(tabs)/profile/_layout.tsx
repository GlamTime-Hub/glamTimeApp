import { ThemeToggle } from "@/presentation/components/ThemeToggle";
import { Stack } from "expo-router";

const LayoutScreen = () => {
  return (
    <Stack
      initialRouteName="home/index"
      screenOptions={{
        headerRight: () => <ThemeToggle />,
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
        name="my-services/index"
        options={{
          headerTitleAlign: "center",
          title: "Mis Servicios",
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
        name="help-support/index"
        options={{
          headerTitleAlign: "center",
          title: "Ayuda y soporte",
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="legal-privacity/index"
        options={{
          headerTitleAlign: "center",
          title: "Privacidad y términos de uso",
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default LayoutScreen;
