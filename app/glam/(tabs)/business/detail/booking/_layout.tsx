import { Stack } from "expo-router";

const DetailBookingScreen = () => {
  return (
    <Stack
      screenOptions={{
        title: "Reserva",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="professional/[businessId]"
        options={{
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="confirmation/index"
        options={{
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="slots/index"
        options={{
          headerTitleAlign: "center",
          title: "Selecciona una fecha",
        }}
      />
    </Stack>
  );
};

export default DetailBookingScreen;
