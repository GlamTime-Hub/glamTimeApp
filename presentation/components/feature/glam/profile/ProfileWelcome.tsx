import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

import { Text } from "@/presentation/components/ui/text";
import { Button } from "@/presentation/components/ui/button";
import { useColorScheme } from "@/lib/useColorScheme";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 300,
  },
});
export const ProfileWelcome = () => {

  const  { isDarkColorScheme } = useColorScheme();


  return (
    <View className="flex-1 justify-center items-center px-6">

      <Image
        source={isDarkColorScheme ? require(`@/assets/images/icon.png`) : require(`@/assets/images/icon-light.png`)}
          resizeMode="contain"
          style={styles.image}

      />
      <Text className="text-lg text-center text-gray-700 dark:text-gray-300 mt-2">
       ¡Hola! Antes de seguir, inicia sesión para ver tu perfil y agendar turnos en salones y barberías.
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
