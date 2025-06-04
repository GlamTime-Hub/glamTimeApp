import { useColorScheme } from "@/lib/useColorScheme";
import { Stack } from "expo-router";

const MyProfessionalLayout = () => {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Stack
      initialRouteName="home/[businessId]"
      screenOptions={{
        headerShown: true,
        headerTintColor: isDarkColorScheme ? "white" : "black",
      }}
    >
      <Stack.Screen
        name="home/[businessId]"
        options={{
          headerTitleAlign: "center",
          title: "Mis Profesionales",
        }}
      />
      <Stack.Screen
        name="detail/[id]"
        options={{
          headerTitleAlign: "center",
          title: "Detalle de Profesional",
        }}
      />
    </Stack>
  );
};

export default MyProfessionalLayout;
