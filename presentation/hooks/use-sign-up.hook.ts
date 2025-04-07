import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useSignUpStore } from "../store/use-sign-up.store";

type FormData = z.infer<typeof schema>;

const schema = z
  .object({
    email: z.string().email("Correo invalido"),
    password: z
      .string()
      .min(8, "Debes tener al menos 8 caracteres")
      .regex(/[A-Z]/, "Debe incluir una letra mayúscula")
      .regex(/[a-z]/, "Debe incluir una letra minúscula")
      .regex(/\d/, "Debe incluir un número")
      .regex(/[^A-Za-z0-9]/, "Debe incluir un caracter especial"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export const useSignUp = () => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { addCredentials } = useSignUpStore();

  const password = watch("password");

  const criteria = [
    {
      label: "Al menos 8 caracteres",
      check: (pw: string) => pw.length >= 8,
    },
    {
      label: "Letra mayúscula & minúscula",
      check: (pw: string) => /[a-z]/.test(pw) && /[A-Z]/.test(pw),
    },
    { label: "Al menos 1 numero", check: (pw: string) => /\d/.test(pw) },
    {
      label: "Al menos 1 caracter especial",
      check: (pw: string) => /[^A-Za-z0-9]/.test(pw),
    },
  ];

  const onSubmit = (data: FormData) => {
    const { email, password } = data;
    addCredentials(email, password);
    router.push("/sign-up/user-info");
  };

  return {
    criteria,
    password,
    control,
    errors,
    isValid,
    onSubmit,
    handleSubmit,
  };
};
