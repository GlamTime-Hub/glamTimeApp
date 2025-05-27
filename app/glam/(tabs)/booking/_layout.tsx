import { NotificationIcon } from "@/presentation/components/feature";
import { ThemeToggle } from "@/presentation/components/ThemeToggle";
import { useUserStore } from "@/presentation/store/use-user.store";
import { Stack } from "expo-router";
import { View } from "react-native";

const BookingScreen = () => {
  const { user } = useUserStore();

  return (
    <Stack
      initialRouteName={
        user && ["professional", "admin"].includes(user?.role!)
          ? "professional-home/index"
          : "home/index"
      }
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
          title: "Mis Reservas",
        }}
      />

      <Stack.Screen
        name="professional-home/index"
        options={{
          headerTitleAlign: "center",
          title: "Administrar Reservas",
        }}
      />

      <Stack.Screen
        name="feedback"
        options={{
          headerTitleAlign: "center",
          title: "Calificar Reserva",
        }}
      />

      <Stack.Screen
        name="agenda/index"
        options={{
          headerTitleAlign: "center",
          title: "Mi Agenda",
        }}
      />
    </Stack>
  );
};

export default BookingScreen;
