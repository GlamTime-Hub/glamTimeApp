import { useColorScheme } from "@/lib/useColorScheme";
import { NotificationIcon } from "@/presentation/components/feature";
import { ThemeToggle } from "@/presentation/components/ThemeToggle";
import { Stack } from "expo-router";
import { View } from "react-native";

const DetailScreen = () => {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Stack
      initialRouteName="home/[id]"
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
          title: "Detalle de profesional",
          headerRight: () => null,
        }}
      />
    </Stack>
  );
};

export default DetailScreen;
