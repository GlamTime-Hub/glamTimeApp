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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBusinessByIdAction } from "@/core/actions/business/get-business-by-id.action";
import { updateImageAction } from "@/core/actions/business/update-image.action";

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

export const useBusinessDetail = (id: string) => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["business", id],
    queryFn: () => getBusinessByIdAction(id),
    staleTime,
    enabled: id !== "new",
  });

  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState({
    address: "",
    latitude: 4.711,
    longitude: -74.0721,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  });

  const insets = useSafeAreaInsets();
  const queryClient = useQueryClient();

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
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      phoneNumberExtension: "",
      country: "67e6ff31e035edd4d7bc6cf0", //Colombia
      city: "",
      email: "",
      location: {
        address: "",
        latitude: 4.711,
        longitude: -74.0721,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
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

  const updateImage = async (publicUrl: string) => {
    await updateImageAction(data!.data.id, publicUrl);

    queryClient.invalidateQueries({ queryKey: ["business", id] });
    queryClient.invalidateQueries({ queryKey: ["business"] });

    Toast.show({
      type: "success",
      text1: "Imagen actualizada",
      text2: "La imagen se ha actualizado correctamente",
    });
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const response = await newBusinessAction(data);

    Toast.show({
      type: "success",
      text1: "¡Éxito!",
      text2: "Los datos se han guardado correctamente.",
    });

    if (response) {
      const { id } = response.data;
      queryClient.invalidateQueries({ queryKey: ["business", id] });
      queryClient.invalidateQueries({ queryKey: ["business"] });

      router.push({
        pathname: "/glam/(tabs)/profile/my-business/detail/[id]",
        params: { id },
      });
    }

    setLoading(false);
  };

  useEffect(() => {
    resetField("city");
  }, [countryId]);

  useEffect(() => {
    setValue("location", {
      address: region.address,
      latitude: region.latitude,
      longitude: region.longitude,
      latitudeDelta: region.latitudeDelta,
      longitudeDelta: region.longitudeDelta,
    });
  }, [region]);

  useEffect(() => {
    if (data) {
      setRegion({
        address: data.data.location.address,
        latitude: data.data.location.latitude,
        longitude: data.data.location.longitude,
        latitudeDelta: data.data.location.latitudeDelta,
        longitudeDelta: data.data.location.longitudeDelta,
      });

      reset({
        name: data.data.name,
        phoneNumber: data.data.phoneNumber,
        phoneNumberExtension: data.data.phoneNumberExtension,
        country: data.data.country,
        city: data.data.city,
        email: data.data.email,
        location: {
          address: data.data.location.address,
          latitude: data.data.location.latitude,
          longitude: data.data.location.longitude,
          latitudeDelta: data.data.location.latitudeDelta,
          longitudeDelta: data.data.location.longitudeDelta,
        },
      });
    }
  }, [data]);

  return {
    business: data?.data,
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
