import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Toast from "react-native-toast-message";
import { postContactAction } from "@/core/actions/contact/post-contact.action";
import { useState } from "react";

const schema = z.object({
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
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      subject: "",
      description: "",
    },
  });

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
    loading,
    errors,
    handleSubmit,
    onSubmit,
  };
};
