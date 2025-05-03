import { Stack } from "expo-router";
import { ThemeToggle } from "@/presentation/components/ThemeToggle";
import { NotificationIcon } from "@/presentation/components/feature";
import { View } from "react-native";

export default function MyScheduleLayout() {
  return (
    <Stack
      initialRouteName="business/index"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="business/index"
        options={{
          headerTitleAlign: "center",
          title: "Horarios de mis Negocios",
        }}
      />

      <Stack.Screen
        name="business-schedule/[id]"
        options={{
          headerTitleAlign: "center",
          title: "Mis Horarios",
        }}
      />
    </Stack>
  );
}
