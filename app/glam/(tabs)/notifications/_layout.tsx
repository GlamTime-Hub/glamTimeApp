import { NotificationIcon } from "@/presentation/components/feature";
import { ThemeToggle } from "@/presentation/components/ThemeToggle";
import { Stack } from "expo-router";
import { View } from "react-native";

const NotificationLayout = () => {
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
          title: "Notificaciones",
        }}
      />
      <Stack.Screen
        name="professional-booking/index"
        options={{
          headerTitleAlign: "center",
          title: "Reserva",
        }}
      />

      <Stack.Screen
        name="booking-confirmed/index"
        options={{
          headerTitleAlign: "center",
          title: "Reserva Confirmada",
        }}
      />
    </Stack>
  );
};

export default NotificationLayout;
