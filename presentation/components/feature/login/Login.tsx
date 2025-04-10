import { View } from "react-native";
import { useLogin } from "../../../hooks/use-login.hook";
import { Text } from "../../ui/text";
import { Controller } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { router } from "expo-router";
import { Google } from "@/lib/icons/Google";
import { Apple } from "@/lib/icons/Apple";
import { LoadingIndicator } from "../glam/shared/LoadingIndicator";

export const Login = () => {
  const { control, loading, errors, handleSubmit, onSubmit } = useLogin();

  return (
    <View className="flex-1 flex flex-col  justify-center items-center">
      {/* Sección de login */}
      <View className="flex-1 mt-20 ">
        <View className="">
          <Text className="text-2xl mb-4 text-center font-semibold ">
            Iniciar Sesión
          </Text>

          <View className="mb-2">
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  readOnly={loading}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Correo electrónico"
                />
              )}
            />
            {errors.email && (
              <Text className="text-red-500 text-sm">
                {errors.email.message}
              </Text>
            )}
          </View>
          <View>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  readOnly={loading}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Contraseña"
                  secureTextEntry
                />
              )}
            />
            {errors.password && (
              <Text className="text-red-500 text-sm">
                {errors.password.message}
              </Text>
            )}
          </View>

          <Button
            disabled={loading}
            className="mt-4 flex flex-row gap-2"
            onPress={handleSubmit(onSubmit)}
          >
            {loading && <LoadingIndicator />}

            <Text>Iniciar Sesión</Text>
          </Button>
          <View className="flex flex-row justify-center text-center text-sm mt-3">
            <Text>¿No tienes cuenta?</Text>
            <Text
              className="ml-2 font-bold underline"
              onPress={() => router.push("/sign-up/credentials")}
            >
              Regístrate
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center my-6">
          <View className="flex-1 h-px bg-gray-300" />
          <Text className="text-center text-gray-500 mx-4">O continúa con</Text>
          <View className="flex-1 h-px bg-gray-300" />
        </View>

        <View className="flex flex-col justify-center gap-4">
          <Button disabled={loading} className="flex flex-row  gap-2 w-full">
            <Google size={24} />
            <Text>Iniciar sesión con Google</Text>
          </Button>
          <Button disabled={loading} className="flex flex-row  gap-2 w-full">
            <Apple size={24} />
            <Text>Iniciar sesión con Apple</Text>
          </Button>
        </View>
      </View>
    </View>
  );
};
