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
        name="detail/[id]"
        options={{
          headerTitleAlign: "center",
          title: "Detalle",
        }}
      />
      <Stack.Screen
        name="filter/index"
        options={{
          headerTitleAlign: "center",
          presentation: "modal",
          title: "Filtrar por",
        }}
      />
    </Stack>
  );
};

export default BusinessScreen;
