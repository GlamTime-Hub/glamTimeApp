import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthService } from "../services/login.service";
import { useState } from "react";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

const schema = z.object({
  email: z.string().nonempty("Correo requerido").email(),
  password: z.string().nonempty("Contraseña requerida"),
});

type FormData = z.infer<typeof schema>;

export const useLogin = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: FormData) => {
    console.log("Datos del formulario:", data);
    setLoading(true);

    const response = await AuthService.loginWithEmail(
      data.email,
      data.password
    );

    if (response) {
      console.error("Error al iniciar sesión", response);

      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Error iniciando sesión",
      });

      return;
    }
    setLoading(true);
    router.push("/glam/(tabs)/home");
  };

  return { control, loading, errors, handleSubmit, onSubmit };
};
