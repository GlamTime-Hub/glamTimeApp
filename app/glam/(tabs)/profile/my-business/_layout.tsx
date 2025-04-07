import { Stack } from "expo-router";
import { ThemeToggle } from "@/presentation/components/ThemeToggle";

export default function MyBusinessLayout() {
  return (
    <Stack
      initialRouteName="home/index"
      screenOptions={{
        headerRight: () => <ThemeToggle />,
      }}
    >
      <Stack.Screen
        name="home/index"
        options={{
          headerTitleAlign: "center",
          title: "Mis Negocios",
        }}
      />

      <Stack.Screen
        name="detail/[id]"
        options={{
          headerTitleAlign: "center",
          title: "Tu negocio ",
        }}
      />
    </Stack>
  );
}
