import { Platform, View, Pressable } from "react-native";
import { Text } from "../../ui/text";
import { Controller } from "react-hook-form";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { useSignUp } from "@/presentation/hooks/use-sign-up.hook";
import { CheckCheck, CircleX } from "@/lib/icons/Icons";
import { router } from "expo-router";
import { useState } from "react";
import { Eye, EyeOff } from "@/lib/icons/Icons";

export const Credentials = () => {
  const { control, password, criteria, errors, handleSubmit, onSubmit } =
    useSignUp();

  const isIos = Platform.OS === "ios";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <View className="px-10 py-5 flex-1 flex justify-between">
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
              <View className="relative">
                <Input
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Contraseña"
                  secureTextEntry={!showPassword}
                  className="pr-10"
                />
                <Pressable
                  className="absolute right-3 top-3"
                  onPress={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff size={20} color="#6b7280" />
                  ) : (
                    <Eye size={20} color="#6b7280" />
                  )}
                </Pressable>
              </View>
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
              <View className="relative">
                <Input
                  onChangeText={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Confirmar Contraseña"
                  secureTextEntry={!showConfirm}
                  className="pr-10"
                />
                <Pressable
                  className="absolute right-3 top-3"
                  onPress={() => setShowConfirm((prev) => !prev)}
                >
                  {showConfirm ? (
                    <EyeOff size={20} color="#6b7280" />
                  ) : (
                    <Eye size={20} color="#6b7280" />
                  )}
                </Pressable>
              </View>
            )}
          />

          {errors.confirmPassword && (
            <Text className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>
      </View>

      <View>
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
