import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AuthService } from "../services/login.service";
import { useState } from "react";
import { router } from "expo-router";
import { useLoginStore } from "../store/use-login.store";
import { CountryPhone } from "@/core/interfaces/country-phone.interface";
import Toast from "react-native-toast-message";
import { getUserByPhoneNumberAction } from "@/core/actions/user/get-user-by-phone-number.action";
import { useUserStore } from "../store/use-user.store";

const schema = z.object({
  phoneNumber: z.string().nonempty("Debes ingresar tu número de contacto"),
  phoneNumberExtension: z.string(),
});

type FormData = z.infer<typeof schema>;

export const useLogin = () => {
  const {
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      phoneNumber: "",
      phoneNumberExtension: "",
    },
  });

  const { addUser } = useUserStore();

  const onChangePhone = (phoneNumber: string) => {
    setValue("phoneNumber", phoneNumber.length === 0 ? "" : `${phoneNumber}`);

    if (phoneNumber.length > 0) {
      clearErrors("phoneNumber");
    }
  };

  const onChangeCountry = (country: CountryPhone) => {
    setValue("phoneNumberExtension", `${country?.callingCode}`);
  };

  const { phoneNumber, phoneNumberExtension, addPhoneNumber } = useLoginStore();

  const [loading, setLoading] = useState<boolean>(false);

  const verifyOtp = async (otp: string) => {
    setLoading(true);
    const data = `${phoneNumberExtension}${phoneNumber}`;
    const session = await AuthService.verifyOtp(data, otp);

    //verify user
    const user = await getUserByPhoneNumberAction(
      phoneNumber,
      phoneNumberExtension
    );

    if (session.error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Código de verificación incorrecto",
      });
    }

    if (!user.data) {
      router.push({
        pathname: "/sign-up/[userAuthId]",
        params: {
          userAuthId: session.session?.user.id,
        },
      });
      return;
    }

    router.push("/glam/(tabs)/home");

    addUser(user.data);

    setLoading(false);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const phoneNumber = `${data.phoneNumberExtension}${data.phoneNumber}`;

    await AuthService.signInWithOtp(phoneNumber);

    Toast.show({
      type: "success",
      text1: "Código de verificación enviado",
    });

    addPhoneNumber(data.phoneNumber, data.phoneNumberExtension);

    setLoading(false);
    router.push("/login/verify-otp");
  };

  return {
    loading,
    errors,
    handleSubmit,
    onSubmit,
    onChangePhone,
    onChangeCountry,
    verifyOtp,
  };
};
