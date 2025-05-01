import { getHomeBusinessDetailAction } from "@/core/actions/business/get-home-business-detail.action";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useBusinessBookingStore } from "../store/use-business-booking.store";
import { useEffect } from "react";
import { Linking, Platform } from "react-native";
import Toast from "react-native-toast-message";

export const useBusinessDetail = () => {
  const { id } = useLocalSearchParams();

  const { addProfessional, addService } = useBusinessBookingStore();

  const { data, isLoading } = useQuery({
    queryKey: ["businessDetail", id],
    queryFn: () => getHomeBusinessDetailAction(id as string),
    enabled: !!id,
  });

  const openWhatsApp = async (
    phoneNumber: string,
    phoneNumberExtension: string
  ) => {
    const formattedPhoneNumber = `${phoneNumberExtension}${phoneNumber.replace(
      /\s+/g,
      ""
    )}`;
    const url = `https://wa.me/${formattedPhoneNumber.replace(
      "+",
      ""
    )}?text=Hola!%20me%20interesa%20tu%20servicio`;

    const response = await Linking.canOpenURL(url);

    if (response) {
      return await Linking.openURL(url);
    }

    Toast.show({
      type: "error",
      text1: "Error",
      text2: "Whatsapp no está instalado en el dispositivo",
    });
  };

  const openLocation = async (lat: number, lng: number, label: string) => {
    const url = Platform.select({
      ios: `maps:0,0?q=${label}@${lat},${lng}`,
      android: `geo:0,0?q=${lat},${lng}(${label})`,
    });

    await Linking.openURL(url!);
  };

  useEffect(() => {
    addProfessional(null);
    addService(null);
  }, []);

  return {
    id,
    business: data?.data,
    isLoading,
    openWhatsApp,
    openLocation,
  };
};
