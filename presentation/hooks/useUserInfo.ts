import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CountryPhone } from "../interfaces/country-phone.interface";
import { useState } from "react";

const MONTHS = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

const CITIES = ["Barrancabermeja"];

const DAYS = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

const GENDER = ["Masculino", "Femenino", "No binario"];

const schema = z.object({
  name: z.string().nonempty("Debes ingresar tu nombre"),
  birthMonth: z.string().nonempty("Debes ingresar tu mes de nacimiento"),
  birthDay: z.string().nonempty("Debes ingresar tu día de nacimiento"),
  phoneNumber: z.string().nonempty("Debes ingresar tu número de teléfono"),
  city: z.string().nonempty("Debes ingresar tu ciudad"),
  gender: z.string().nonempty("Debes ingresar tu género"),
});

type FormData = z.infer<typeof schema>;

export const useUserInfo = () => {
  const [phoneCountry, setPhoneCountry] = useState<CountryPhone | null>();

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      birthMonth: "",
      birthDay: "",
      phoneNumber: "",
      city: "",
      gender: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("data", data);
    router.push("/glam/home");
  };

  const onChangePhone = (phoneNumber: string) => {
    setValue(
      "phoneNumber",
      phoneNumber.length === 0
        ? ""
        : `${phoneCountry?.callingCode}${phoneNumber}`
    );

    if (phoneNumber.length > 0) {
      clearErrors("phoneNumber");
    }
  };

  const onChangeCountry = (country: CountryPhone) => {
    setPhoneCountry(country);
    const phoneNumber = getValues("phoneNumber");
    setValue(
      "phoneNumber",
      phoneNumber.length === 0
        ? ""
        : `+${phoneCountry?.callingCode}${phoneNumber}`
    );

    if (phoneNumber.length > 0) {
      clearErrors("phoneNumber");
    }
  };

  return {
    MONTHS,
    DAYS,
    GENDER,
    CITIES,
    control,
    errors,
    handleSubmit,
    onSubmit,
    setValue,
    onChangePhone,
    onChangeCountry,
  };
};
