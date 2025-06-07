import { getProfessionalDetailAction } from "@/core/actions/professional/get-professional-detail.action";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useBusinessBookingStore } from "../store/use-business-booking.store";
import { useEffect } from "react";
import { useUserStore } from "../store/use-user.store";

const staleTime = 0;
export const useProfessionalDetail = () => {
  const { professionalId, businessId } = useLocalSearchParams();

  const { addProfessional } = useBusinessBookingStore();

  const { user } = useUserStore();

  const { data, isLoading } = useQuery({
    queryKey: ["professional-detail", `${professionalId}-${businessId}`],
    queryFn: () =>
      getProfessionalDetailAction(
        professionalId as string,
        businessId as string
      ),
    staleTime,
  });

  useEffect(() => {
    if (data?.data && data?.data.userAuthId !== user?.userAuthId) {
      addProfessional(data.data);
    }
  }, [data]);

  return {
    id: professionalId,
    professional: data?.data,
    isLoading,
  };
};
