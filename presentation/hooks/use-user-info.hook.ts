import { zodResolver } from "@hookform/resolvers/zod";
import { router, useLocalSearchParams } from "expo-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Toast from "react-native-toast-message";

import { newUserAction } from "@/core/actions/user/new-user.action";
import { useState } from "react";
import { DAYS, GENDER, MONTHS } from "@/core/constants/profile.constant";
import { useLoginStore } from "../store/use-login.store";
import { useUserStore } from "../store/use-user.store";
import { add } from "date-fns";

const CITIES = ["Barrancabermeja"];

const schema = z.object({
  name: z.string().nonempty("Debes ingresar tu nombre"),
  birthMonth: z.string().nonempty("Debes ingresar tu mes de nacimiento"),
  birthDay: z.string().nonempty("Debes ingresar tu día de nacimiento"),
  email: z.string().email("Debes ingresar un correo válido"),
  phoneNumber: z.string(),
  phoneNumberExtension: z.string(),
  city: z.string().nonempty("Debes ingresar tu ciudad"),
  gender: z.string().nonempty("Debes ingresar tu género"),
});

type FormData = z.infer<typeof schema>;

export const useUserInfo = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { phoneNumber, phoneNumberExtension } = useLoginStore();
  const { userAuthId } = useLocalSearchParams();
  const { addUser } = useUserStore();

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      birthMonth: "",
      birthDay: "",
      phoneNumber: "",
      phoneNumberExtension: "+57",
      city: "",
      gender: "",
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const user = {
      ...data,
      role: "user",
      country: "67e6ff31e035edd4d7bc6cf0",
      city: "67e6ff33e035edd4d7bc6d0e",
      birthDay: parseInt(data.birthDay),
      birthMonth: parseInt(data.birthMonth),
      phoneNumber,
      phoneNumberExtension,
      userAuthId: userAuthId as string,
    };

    const response = await newUserAction(user);
    addUser(response.data);

    Toast.show({
      type: "success",
      text1: "Usuario creado!!!",
    });

    setLoading(false);
    router.push("/glam/(tabs)/home");
  };

  return {
    MONTHS,
    DAYS,
    GENDER,
    CITIES,
    control,
    loading,
    errors,
    handleSubmit,
    onSubmit,
    setValue,
  };
};
