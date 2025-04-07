import { DAYS, GENDER, MONTHS } from "@/core/constants/profile.constant";
import { useUser } from "./use-user.hook";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation } from "./use-location.hook";
import { useEffect, useState } from "react";
import { CountryPhone } from "@/core/interfaces/country-phone.interface";
import Toast from "react-native-toast-message";
import { set } from "lodash-es";
import { updateUser } from "@/core/actions/user/update-user.action";
import { queryClient } from "@/core/config/query-client";

const schema = z.object({
  name: z.string().nonempty("Debes ingresar tu nombre"),
  email: z.string(),
  birthMonth: z.string().nonempty("Debes ingresar tu mes de nacimiento"),
  birthDay: z.string().nonempty("Debes ingresar tu día de nacimiento"),
  phoneNumber: z.string().nonempty("Debes ingresar tu número de teléfono"),
  phoneNumberExtension: z.string(),
  country: z.string(),
  city: z.string().nonempty("Debes ingresar tu ciudad"),
  gender: z.string().nonempty("Debes ingresar tu género"),
});

type FormData = z.infer<typeof schema>;

export const useProfileDetail = () => {
  const { user, error } = useUser();

  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    clearErrors,
    resetField,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user!.name,
      birthMonth: `${user!.birthMonth}`,
      birthDay: `${user!.birthDay}`,
      phoneNumber: user!.phoneNumber,
      phoneNumberExtension: user!.phoneNumberExtension,
      city: user!.city,
      gender: user!.gender,
      email: user!.email,
      country: user!.country,
    },
  });

  const countryId = useWatch({
    control,
    name: "country",
  });

  const { countries, cities, loadingCities, loadingCountries } =
    useLocation(countryId);

  useEffect(() => {
    resetField("city");
  }, [countryId]);

  useEffect(() => {
    setValue("phoneNumber", user?.phoneNumber || "");
  }, []);

  const onChangePhone = (phoneNumber: string) => {
    setValue("phoneNumber", phoneNumber.length === 0 ? "" : `${phoneNumber}`);

    if (phoneNumber.length > 0) {
      clearErrors("phoneNumber");
    }
  };

  const onChangeCountry = (country: CountryPhone) => {
    setValue("phoneNumberExtension", `${country?.callingCode}`);
  };

  const onSave = async (data: FormData) => {
    console.log("data", data);

    const userBody = {
      ...data,
      id: user?.id,
      userAuthId: user?.userAuthId,
    };

    setLoading(true);

    await updateUser(userBody);

    Toast.show({
      type: "success",
      text1: "Perfil actualizado",
      text2: "Los cambios se han guardado correctamente",
    });

    queryClient.invalidateQueries({ queryKey: ["user", "getUser"] });
    setLoading(false);
  };

  return {
    GENDER,
    DAYS,
    MONTHS,
    user,
    backendError: error,
    control,
    errors,
    cities,
    countries,
    loadingCities,
    loadingCountries,
    loading,
    handleSubmit,
    setValue,
    onSave,
    onChangePhone,
    onChangeCountry,
  };
};
