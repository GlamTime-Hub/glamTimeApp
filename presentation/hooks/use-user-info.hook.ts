import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CountryPhone } from "../../core/interfaces/country-phone.interface";
import { useSignUpStore } from "../store/use-sign-up.store";
import Toast from "react-native-toast-message";

import { makeRedirectUri } from "expo-auth-session";
import { newUserAction } from "@/core/actions/user/new-user.action";
import { useState } from "react";
import { DAYS, GENDER, MONTHS } from "@/core/constants/profile.constant";

const CITIES = ["Barrancabermeja"];

const schema = z.object({
  name: z.string().nonempty("Debes ingresar tu nombre"),
  birthMonth: z.string().nonempty("Debes ingresar tu mes de nacimiento"),
  birthDay: z.string().nonempty("Debes ingresar tu día de nacimiento"),
  phoneNumber: z.string().nonempty("Debes ingresar tu número de teléfono"),
  phoneNumberExtension: z.string(),
  city: z.string().nonempty("Debes ingresar tu ciudad"),
  gender: z.string().nonempty("Debes ingresar tu género"),
});

type FormData = z.infer<typeof schema>;

export const useUserInfo = () => {
  const { email, password } = useSignUpStore();
  const [loading, setLoading] = useState<boolean>(false);

  const redirectTo = makeRedirectUri({
    scheme: "com.glamTime",
    path: "confirm-email",
  });

  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
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
    },
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const user = {
      ...data,
      email,
      password,
      role: "user",
      country: "67e6ff31e035edd4d7bc6cf0",
      city: "67e6ff33e035edd4d7bc6d0e",
      birthDay: parseInt(data.birthDay),
      birthMonth: parseInt(data.birthMonth),
      redirectTo,
    };

    const response = await newUserAction(user);

    if (!response.status) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: response.data.message,
      });
      setLoading(false);
      return;
    }

    Toast.show({
      type: "success",
      text1: "Usuario creado!!!",
      text2: "Recuerda confirmar tu correo antes iniciar sesion.",
    });
    setLoading(false);
    router.push("/login");
  };

  const onChangePhone = (phoneNumber: string) => {
    setValue("phoneNumber", phoneNumber.length === 0 ? "" : `${phoneNumber}`);

    if (phoneNumber.length > 0) {
      clearErrors("phoneNumber");
    }
  };

  const onChangeCountry = (country: CountryPhone) => {
    setValue("phoneNumberExtension", `${country?.callingCode}`);
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
    onChangePhone,
    onChangeCountry,
  };
};
