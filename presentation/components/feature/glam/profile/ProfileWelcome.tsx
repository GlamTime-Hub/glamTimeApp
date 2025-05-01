import { router } from "expo-router";
import { View } from "react-native";

import { Text } from "@/presentation/components/ui/text";
import { Button } from "@/presentation/components/ui/button";

export const ProfileWelcome = () => {
  return (
    <View className="flex-1 items-center justify-center px-6">
      <Text className="text-2xl font-semibold text-gray-700 dark:text-gray-300">
        Bienvenido a GlamTime
      </Text>
      <Text className="text-lg text-center text-gray-700 dark:text-gray-300 mt-2">
        Parece que aún no iniciaste sesión. Para acceder a tu perfil y gestionar
        tus turnos en salones y barberías, inicia sesión primero.
      </Text>
      <Button
        className="mt-4 px-6 py-3 w-full rounded-lg shadow-lg"
        onPress={() => router.push("/login/home")}
      >
        <Text>Iniciar Sesión</Text>
      </Button>
    </View>
  );
};
