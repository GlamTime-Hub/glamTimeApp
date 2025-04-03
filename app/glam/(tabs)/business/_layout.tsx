import { ThemeToggle } from "@/presentation/components/ThemeToggle";
import { Stack } from "expo-router";

const BusinessScreen = () => {
  return (
    <Stack
      initialRouteName="list/index"
      screenOptions={{
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Stack.Screen
        name="list/index"
        options={{
          headerTitleAlign: "center",
          title: "Negocios",
        }}
      />
      <Stack.Screen
        name="detail"
        options={{
          headerTitleAlign: "center",
          title: "Detalle",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default BusinessScreen;
