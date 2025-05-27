import { Stack } from "expo-router";

const FeedbackScreen = () => {
  return (
    <Stack
      initialRouteName="business/[id]"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="business/[id]"
        options={{
          headerTitleAlign: "center",
          title: "Calificar Negocio",
        }}
      />
      <Stack.Screen
        name="professional/[id]"
        options={{
          headerTitleAlign: "center",
          title: "Calificar Profesional",
        }}
      />
    </Stack>
  );
};

export default FeedbackScreen;
