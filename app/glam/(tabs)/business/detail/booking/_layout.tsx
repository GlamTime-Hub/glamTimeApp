import { Stack } from "expo-router";

const DetailBookingScreen = () => {
  return (
    <Stack
      initialRouteName="professional/index"
      screenOptions={{
        title: "Reserva",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="professional/index"
        options={{
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="confirmation/index"
        options={{
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="slots/index"
        options={{
          presentation: "modal",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default DetailBookingScreen;
