import { getProfessionalDetailAction } from "@/core/actions/professional/get-professional-detail.action";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useBusinessBookingStore } from "../store/use-business-booking.store";
import { useEffect } from "react";

const staleTime = 1000 * 60 * 60 * 24;
export const useProfessionalDetail = () => {
  const { id, businessId } = useLocalSearchParams();

  const { addProfessional } = useBusinessBookingStore();

  const { data, isLoading } = useQuery({
    queryKey: ["professional-detail", `${id}-${businessId}`],
    queryFn: () =>
      getProfessionalDetailAction(id as string, businessId as string),
    staleTime,
  });

  useEffect(() => {
    if (data?.data) {
      addProfessional(data.data);
    }
  }, [data]);

  return {
    professional: data?.data,
    isLoading,
  };
};
