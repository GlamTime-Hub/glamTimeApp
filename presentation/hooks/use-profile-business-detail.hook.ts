import { z } from "zod";
import { router } from "expo-router";
import { useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useLocation } from "./use-location.hook";
import { zodResolver } from "@hookform/resolvers/zod";
import { CountryPhone } from "@/core/interfaces/country-phone.interface";
import { newBusinessAction } from "@/core/actions/business/new-business.action";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBusinessByIdAction } from "@/core/actions/business/get-business-by-id.action";
import { updateImageAction } from "@/core/actions/business/update-image.action";
import { updateBusinessAction } from "@/core/actions/business/update-business.action";
import { useBusinessLocation } from "./use-business-location";
import { updateBusinessStatusAction } from "@/core/actions/business/update-business-status.action";
import { useBusinessTypes } from "./use-business-types.hook";
import { useUserStore } from "../store/use-user.store";

const schema = z.object({
  name: z.string().nonempty("Debes ingresar el nombre"),
  email: z.string().nonempty("Debes ingresar tu correo electrónico"),
  phoneNumber: z.string().nonempty("Debes ingresar tu número de contacto"),
  phoneNumberExtension: z.string(),
  businesstype: z.string().nonempty("Debes seleccionar el tipo de negocio"),
  country: z.string(),
  city: z.string().nonempty("Debes ingresar tu ciudad"),
  location: z.object({
    address: z.string(),
    latitude: z.number(),
    longitude: z.number(),
    latitudeDelta: z.number(),
    longitudeDelta: z.number(),
  }),
});

const staleTime = 0;

type FormData = z.infer<typeof schema>;

export const useProfileBusinessDetail = (id: string) => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["business", id],
    queryFn: () => getBusinessByIdAction(id),
    staleTime,
    enabled: id !== "new",
  });

  const { businessTypes } = useBusinessTypes();

  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [openCityModal, setOpenCityModal] = useState(false);
  const [valuesModal, setValuesModal] = useState({
    city: data?.data.city,
  });

  const { region, setRegion, setBusinessId } = useBusinessLocation();

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
    getValues,
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
      businesstype: "",
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

    const response =
      id === "new"
        ? await newBusinessAction({ ...data, userId: user?.id })
        : await updateBusinessAction({ id, ...data });

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

  const onUpdateRegion = () => {
    const location = getValues("location");
    setRegion(location);
    setBusinessId(id);

    router.push("/glam/(tabs)/profile/my-business/location");
  };

  const handleBusinessStatus = async (
    businessId: string,
    isActive: boolean
  ) => {
    setLoading(true);
    await updateBusinessStatusAction(businessId, isActive);

    Toast.show({
      type: "success",
      text1: "¡Éxito!",
      text2: `El negocio ha sido ${isActive ? "activado" : "desactivado"}.`,
    });

    queryClient.invalidateQueries({ queryKey: ["business", businessId] });
    queryClient.invalidateQueries({ queryKey: ["business"] });

    setLoading(false);
  };

  useEffect(() => {
    resetField("city");
  }, [countryId]);

  useEffect(() => {
    if (data) {
      const business = data.data;

      reset({
        name: business.name,
        phoneNumber: business.phoneNumber,
        phoneNumberExtension: business.phoneNumberExtension,
        country: business.country,
        city: business.city,
        email: business.email,
        businesstype: business.businesstype,
        location: {
          address: business.location.address,
          latitude: business.location.latitude,
          longitude: business.location.longitude,
          latitudeDelta: business.location.latitudeDelta,
          longitudeDelta: business.location.longitudeDelta,
        },
      });
    }
  }, [data]);

  return {
    valuesModal,
    businessTypes,
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
    openCityModal,
    handleSubmit,
    updateImage,
    setValuesModal,
    onChangePhone,
    onChangeCountry,
    onSubmit,
    onUpdateRegion,
    setValue,
    setOpenCityModal,
    handleBusinessStatus,
  };
};
