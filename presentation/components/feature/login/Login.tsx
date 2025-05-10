import { Image, StyleSheet, View } from "react-native";
import { useLogin } from "../../../hooks/use-login.hook";
import { Text } from "../../ui/text";
import { Button } from "../../ui/button";
import { LoadingIndicator } from "../glam/shared/LoadingIndicator";
import { PhoneNumber } from "../../ui/PhoneNumber";
import { useColorScheme } from "@/lib/useColorScheme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export const Login = () => {
  const {
    loading,
    errors,
    handleSubmit,
    onSubmit,
    onChangeCountry,
    onChangePhone,
  } = useLogin();

  const { isDarkColorScheme } = useColorScheme();

  return (
    <View className="flex-1  m-6">
      <View className="mt-20 flex flex-col justify-center items-center">


         <Image
        source={isDarkColorScheme ? require(`@/assets/images/icon.png`) : require(`@/assets/images/icon-light.png`)}
          resizeMode="contain"
          style={styles.image}

      />

        <Text className="text-2xl mb-4 text-center font-baloo-bold ">
          Iniciar Sesión
        </Text>

        <View className="my-2">
          <PhoneNumber
            onChangeCountry={onChangeCountry}
            onChangePhone={onChangePhone}
            disabled={loading}
          />
          {errors.phoneNumber && (
            <Text className="text-red-500 text-sm">
              {errors.phoneNumber.message}
            </Text>
          )}
        </View>
      </View>
      <Button
        disabled={loading}
        className="mt-4 flex flex-row gap-2"
        onPress={handleSubmit(onSubmit)}
      >
        {loading && <LoadingIndicator />}

        <Text>Enviar Código</Text>
      </Button>
      <View className="flex items-center text-sm mt-3">
        <Text>¿No tienes cuenta?</Text>
        <Text className="font-baloo-bold mt-2 text-center">
          No importa, ingresa tu número de contacto y la creamos juntos.
        </Text>
      </View>
    </View>
  );
};
