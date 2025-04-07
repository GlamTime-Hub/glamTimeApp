import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUser } from "./use-user.hook";
import { useLocation } from "./use-location.hook";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { CountryPhone } from "@/core/interfaces/country-phone.interface";
import Toast from "react-native-toast-message";
import { newBusinessAction } from "@/core/actions/business/new-business.action";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { getBusinessByIdAction } from "@/core/actions/business/get-business-by-id.action";
import { queryClient } from "@/core/config/query-client";

const schema = z.object({
  name: z.string().nonempty("Debes ingresar el nombre"),
  email: z.string().nonempty("Debes ingresar tu correo electrónico"),
  phoneNumber: z.string().nonempty("Debes ingresar tu número de contacto"),
  phoneNumberExtension: z.string(),
  country: z.string(),
  city: z.string().nonempty("Debes ingresar tu ciudad"),
  location: z.object({
    address: z.string().nonempty("Debes ingresar la dirección"),
    latitude: z.number(),
    longitude: z.number(),
    latitudeDelta: z.number(),
    longitudeDelta: z.number(),
  }),
});

const staleTime = 1000 * 60 * 60 * 24;

type FormData = z.infer<typeof schema>;

export const useBusiness = (id: string) => {
  console.log("id", id);
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["business", id],
    queryFn: () => getBusinessByIdAction(id),
    staleTime,
    enabled: id !== "new",
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  console.log("data", data);

  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState({
    address: data ? data.data.location.address : "",
    latitude: data ? data.data.location.latitude : 4.711,
    longitude: data ? data.data.location.longitude : -74.0721,
    latitudeDelta: data ? data.data.location.latitudeDelta : 0.05,
    longitudeDelta: data ? data.data.location.longitudeDelta : 0.05,
  });

  const insets = useSafeAreaInsets();

  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 30,
    right: 30,
  };

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
      name: data ? data.data.name : "",
      phoneNumber: data ? data.data.phoneNumber : "",
      phoneNumberExtension: data ? data.data.phoneNumberExtension : "",
      country: "67e6ff31e035edd4d7bc6cf0", //Colombia
      city: data ? data.data.city : "",
      email: data ? data.data.email : "",
      location: {
        address: data ? data.data.location.address : "",
        latitude: data ? data.data.location.latitude : 4.711,
        longitude: data ? data.data.location.longitude : -74.0721,
        latitudeDelta: data ? data.data.location.latitudeDelta : 0.05,
        longitudeDelta: data ? data.data.location.longitudeDelta : 0.05,
      },
    },
  });

  const countryId = useWatch({
    control,
    name: "country",
  });

  const { countries, cities } = useLocation(countryId);

  const onChangePhone = (phoneNumber: string) => {
    setValue("phoneNumber", phoneNumber.length === 0 ? "" : `${phoneNumber}`);

    if (phoneNumber.length > 0) {
      clearErrors("phoneNumber");
    }
  };

  const onChangeCountry = (country: CountryPhone) => {
    setValue("phoneNumberExtension", `${country?.callingCode}`);
  };

  const updateImage = () => {};

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const response = await newBusinessAction(data);

    console.log("response", response);

    Toast.show({
      type: "success",
      text1: "¡Éxito!",
      text2: "Los datos se han guardado correctamente.",
    });

    if (response) {
      const { id } = response.data;
      router.push({
        pathname: "/glam/(tabs)/profile/my-business/detail/[id]",
        params: { id },
      });
    }

    queryClient.invalidateQueries({ queryKey: ["business", id] });

    setLoading(false);
  };

  useEffect(() => {
    resetField("city");
  }, [countryId]);

  useEffect(() => {
    setValue("phoneNumber", user?.phoneNumber || "");
  }, []);

  useEffect(() => {
    setValue("location", {
      address: region.address,
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    });
  }, [region]);

  return {
    user,
    countries,
    cities,
    contentInsets,
    control,
    errors,
    loading,
    isLoading,
    region,
    handleSubmit,
    updateImage,
    onChangePhone,
    onChangeCountry,
    onSubmit,
    setRegion,
  };
};
