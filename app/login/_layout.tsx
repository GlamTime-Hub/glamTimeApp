import { Stack } from "expo-router";

const LoginLayoutScreen = () => {
  return (
    <Stack initialRouteName="home/index">
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
