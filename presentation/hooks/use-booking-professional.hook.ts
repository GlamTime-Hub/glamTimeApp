import { getProfessionalByBusinessIdAction } from "@/core/actions/professional/get-professional-by-business-id.action";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useBusinessBookingStore } from "../store/use-business-booking.store";
import { useUserStore } from "../store/use-user.store";
import { Professional } from "@/core/interfaces/professional.interface";
import Toast from "react-native-toast-message";

const staleTime = 1000 * 60 * 60 * 24;

export const useBookingProfessional = () => {
  const { businessId } = useLocalSearchParams();
  const { professional, addProfessional } = useBusinessBookingStore();
  const { user } = useUserStore();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["booking-professionals", businessId],
    queryFn: () =>
      getProfessionalByBusinessIdAction(businessId as string, true),
    staleTime,
  });

  const onSelectProfessional = (professional: Professional) => {
    if (user?.userAuthId === professional.userAuthId) {
      Toast.show({
        type: "error",
        text1: "No puedes reservarte a ti mismo.",
        text2: "Selecciona otro profesional.",
      });
      return;
    }

    addProfessional(professional);
    router.push("/glam/(tabs)/business/detail/booking/slots");
  };

  return {
    professional,
    professionals: data?.data,
    isLoading,
    addProfessional,
    onSelectProfessional,
  };
};
