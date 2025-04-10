import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthService } from "../services/login.service";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

const schema = z.object({
  email: z
    .string()
    .nonempty("Correo requerido")
    .email("Formato de correo inválido"),
  password: z.string().nonempty("Contraseña requerida"),
});

type FormData = z.infer<typeof schema>;

export const useLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const response = await AuthService.loginWithEmail(
      data.email,
      data.password
    );

    const errors: { [key: string]: string } = {
      empty: "",
      invalid_credentials: "Correo o contraseña incorrectos",
      email_not_confirmed: "Debes confirmar el correo antes de iniciar sesión",
    };

    const errorMessage =
      errors[response && response.code ? response?.code : "empty"];

    if (errorMessage.length > 0) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: errorMessage,
      });

      return;
    }
    setLoading(true);
    router.push("/glam/(tabs)/home");
  };

  return { control, loading, errors, handleSubmit, onSubmit };
};
