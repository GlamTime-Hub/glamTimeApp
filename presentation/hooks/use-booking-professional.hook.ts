import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useBusinessBookingStore } from "../store/use-business-booking.store";
import { useUserStore } from "../store/use-user.store";
import { Professional } from "@/core/interfaces/professional.interface";
import Toast from "react-native-toast-message";
import { getProfessionalWithActiveServiceAction } from "@/core/actions/professional/get-professional-with-active-service.action";

export const useBookingProfessional = () => {
  const { businessId } = useLocalSearchParams();
  const { professional, service, addProfessional } = useBusinessBookingStore();
  const { user } = useUserStore();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["booking-professionals", businessId],
    queryFn: () =>
      getProfessionalWithActiveServiceAction(
        businessId as string,
        service?.service.id!
      ),
    staleTime: 0,
    enabled: !!service,
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
