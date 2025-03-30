import { Platform, View } from "react-native";
import { Text } from "../../ui/text";
import { Controller } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useCredentials } from "@/presentation/hooks/useCredentials";
import { CheckCheck, CircleX } from "@/lib/icons/Icons";
import { router } from "expo-router";

export const Credentials = () => {
  const { control, password, criteria, errors, handleSubmit, onSubmit } =
    useCredentials();

  const isIos = Platform.OS === "ios";

  return (
    <View className="px-10 py-5 h-full flex justify-between">
      <View>
        <Text className="text-center text-2xl font-bold my-4">
          Planea tu look sin estrés
        </Text>
        <View className="mb-2">
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Correo electrónico"
                keyboardType="email-address"
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-500 text-sm">{errors.email.message}</Text>
          )}
        </View>

        <View>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
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

          <View className="mt-1 mb-4">
            {criteria.map(({ label, check }, index) => (
              <View key={index} className="flex flex-row items-center gap-2">
                {check(password) ? (
                  <CheckCheck color={"green"} size={20} />
                ) : (
                  <CircleX className="text-red-500" color={"red"} size={20} />
                )}
                <Text>{label}</Text>
              </View>
            ))}
          </View>

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                placeholder="Confirmar Contraseña"
                secureTextEntry
              />
            )}
          />

          {errors.confirmPassword && (
            <Text className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>
      </View>

      <View className="mb-10">
        <Button onPress={handleSubmit(onSubmit)}>
          <Text>Continuar</Text>
        </Button>
        {isIos && (
          <Button
            className="mt-4"
            variant={"outline"}
            onPress={() => router.push("/login")}
          >
            <Text>Volver</Text>
          </Button>
        )}
      </View>
    </View>
  );
};
