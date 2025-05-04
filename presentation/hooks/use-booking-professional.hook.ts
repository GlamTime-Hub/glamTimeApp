import { getProfessionalByBusinessIdAction } from "@/core/actions/professional/get-professional-by-business-id.action";
import { useQuery } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useBusinessBookingStore } from "../store/use-business-booking.store";

const staleTime = 1000 * 60 * 60 * 24;

export const useBookingProfessional = () => {
  const { businessId } = useLocalSearchParams();
  const { professional, addProfessional } = useBusinessBookingStore();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["booking-professionals", businessId],
    queryFn: () =>
      getProfessionalByBusinessIdAction(businessId as string, true),
    staleTime,
  });

  const onSelectProfessional = (professional: any) => {
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
