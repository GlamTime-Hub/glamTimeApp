import { Stack } from "expo-router";
import { ThemeToggle } from "@/presentation/components/ThemeToggle";

export default function MyBusinessLayout() {
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
        name="my-professionals/[businessId]"
        options={{
          headerTitleAlign: "center",
          title: "Mis Profesionales",
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
