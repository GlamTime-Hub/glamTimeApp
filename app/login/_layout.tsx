import { useColorScheme } from "@/lib/useColorScheme";
import { Stack } from "expo-router";

const LoginLayoutScreen = () => {
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
          title: "Iniciar Sesión",
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="verify-otp/index"
        options={{
          title: "Verificar Código",
          headerTitleAlign: "center",
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default LoginLayoutScreen;
