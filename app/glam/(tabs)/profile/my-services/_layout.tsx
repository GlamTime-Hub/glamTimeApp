import { useColorScheme } from "@/lib/useColorScheme";
import { Stack } from "expo-router";

const MyServicesScreen = () => {
  const { isDarkColorScheme } = useColorScheme();

  return (
    <Stack
      initialRouteName="home/index"
      screenOptions={{
        headerTintColor: isDarkColorScheme ? "white" : "black",
      }}
    >
      <Stack.Screen
        name="home/index"
        options={{
          headerTitleAlign: "center",
          title: "Negocios",
        }}
      />
      <Stack.Screen
        name="my-service/[businessId]"
        options={{
          headerTitleAlign: "center",
          title: "Mis Servicios",
        }}
      />
    </Stack>
  );
};

export default MyServicesScreen;
