import { NotificationIcon } from "@/presentation/components/feature";
import { ThemeToggle } from "@/presentation/components/ThemeToggle";
import { Stack } from "expo-router";
import { View } from "react-native";

const DetailScreen = () => {
  return (
    <Stack
      initialRouteName="home/[id]"
      screenOptions={{
        headerRight: () => (
          <View className="flex flex-row gap-2 justify-end px-0 relative -right-3">
            <NotificationIcon />
            <ThemeToggle />
          </View>
        ),
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
          headerRight: () => null,
        }}
      />
      <Stack.Screen
        name="professional-detail/[id]"
        options={{
          headerTitleAlign: "center",
          presentation: "modal",
          title: "Detalle de profesional",
          headerRight: () => null,
        }}
      />
    </Stack>
  );
};

export default DetailScreen;
