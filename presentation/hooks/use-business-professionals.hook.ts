import { getProfessionalsAction } from "@/core/actions/professional/get-professionals.action";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";

const staleTime = 1000 * 60 * 60 * 24;

export const useBusinessProfessional = (businessId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["business-professionals", `${businessId}`],
    queryFn: () => getProfessionalsAction(businessId),
    staleTime,
  });

  const goPrefessionalDetail = (id: string) => {
    router.push({
      pathname: "/glam/(tabs)/business/detail/professional-detail/[id]",
      params: { id, businessId },
    });
  };

  return {
    professionals: data?.data,
    isLoading,
    goPrefessionalDetail,
  };
};
