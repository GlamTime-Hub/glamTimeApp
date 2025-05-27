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

      <Stack.Screen
        name="booking-cancelled-by-user/index"
        options={{
          headerTitleAlign: "center",
          title: "Reserva Cancelada",
        }}
      />

      <Stack.Screen
        name="booking-cancelled-by-professional/index"
        options={{
          headerTitleAlign: "center",
          title: "Reserva Cancelada",
        }}
      />

      <Stack.Screen
        name="invitation/index"
        options={{
          headerTitleAlign: "center",
          title: "Nueva invitación",
        }}
      />
      <Stack.Screen
        name="invitation-accepted/index"
        options={{
          headerTitleAlign: "center",
          title: "Invitación aceptada",
        }}
      />
    </Stack>
  );
};

export default NotificationLayout;
