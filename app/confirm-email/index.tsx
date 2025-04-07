import { Button } from "@/presentation/components/ui/button";
import { Text } from "@/presentation/components/ui/text";
import { router } from "expo-router";
import { View } from "react-native";

export default function ConfirmEmail() {
  return (
    <View className="flex-1 flex px-6 justify-center gap-4 mb-16">
      <Text className="text-2xl text-center font-bold">
        Tu correo ha sido confirmado!!!
      </Text>
      <Text className="text-lg text-center">
        Ahora puedes iniciar sesión y empezar a disfrutar de
      </Text>
      <Text className="text-3xl font-bold text-center">GlamTime</Text>
      <Button onPress={() => router.push("/login")}>
        <Text>Iniciar Sesión</Text>
      </Button>
    </View>
  );
}
