import { useColorScheme } from "@/lib/useColorScheme";
import { NotificationIcon } from "@/presentation/components/feature";
import { ThemeToggle } from "@/presentation/components/ThemeToggle";
import { useUserStore } from "@/presentation/store/use-user.store";
import { Stack } from "expo-router";
import { View } from "react-native";

const BookingScreen = () => {
  const { user } = useUserStore();
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Stack
      initialRouteName={
        user && ["professional", "admin"].includes(user?.role!)
          ? "professional-home/index"
          : "home/index"
      }
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
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="agenda/index"
        options={{
          headerTitleAlign: "center",
          title: "Mi Agenda",
        }}
      />

      <Stack.Screen
        name="history-detail/[bookingId]"
        options={{
          headerTitleAlign: "center",
          title: "Detalle de Reserva",
        }}
      />
    </Stack>
  );
};

export default BookingScreen;
