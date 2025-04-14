import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { postContactAction } from "@/core/actions/contact/post-contact.action";
import { useState } from "react";
import { router } from "expo-router";

const schema = z.object({
  name: z.string().nonempty("El nombre es requerido"),
  email: z.string().email("Correo inválido"),
  phoneNumber: z.string().nonempty("El teléfono es requerido"),
  phoneNumberExtension: z.string(),
  subject: z
    .string()
    .max(50, "Máximo 50 caracteres")
    .nonempty("El asunto es requerido"),
  description: z.string().nonempty("La descripción es requerida"),
});

type FormData = z.infer<typeof schema>;

export const useContactForm = () => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      phoneNumberExtension: "",
      subject: "",
      description: "",
    },
  });

  const onChangePhone = (phone: string) => {
    setValue("phoneNumber", phone);
    if (phone.length > 0) clearErrors("phoneNumber");
  };

  const onChangeCountry = (country: { callingCode: string }) => {
    setValue("phoneNumberExtension", `${country.callingCode}`);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await postContactAction(data);

      Toast.show({
        type: "success",
        text1: "Mensaje enviado",
        text2: "Pronto nos pondremos en contacto contigo.",
      });

      reset();
      router.push("/glam/(tabs)/profile/home");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Ocurrió un problema. Intenta de nuevo.",
      });
    }
    setLoading(false);
  };

  return {
    control,
    errors,
    handleSubmit,
    onSubmit,
    onChangePhone,
    onChangeCountry,
    loading,
  };
};
