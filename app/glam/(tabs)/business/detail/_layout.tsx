import { ThemeToggle } from "@/presentation/components/ThemeToggle";
import { Stack } from "expo-router";

const DetailScreen = () => {
  return (
    <Stack
      initialRouteName="home/[id]"
      screenOptions={{
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Stack.Screen
        name="home/[id]"
        options={{
          headerTitleAlign: "center",
          title: "Detalle",
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
        }}
      />
      <Stack.Screen
        name="professional-detail/[id]"
        options={{
          headerTitleAlign: "center",
          presentation: "modal",
          title: "Detalle de profesional",
        }}
      />
    </Stack>
  );
};

export default DetailScreen;
