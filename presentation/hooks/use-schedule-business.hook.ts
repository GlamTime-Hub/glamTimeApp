import { getBusinessByProfessionalAction } from "@/core/actions/professional/get-business-by-professional.action";
import { useQuery } from "@tanstack/react-query";

const staleTime = 1000 * 60 * 60 * 24;

export const useScheduleBusiness = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["schedule-business"],
    queryFn: () => getBusinessByProfessionalAction(),
    staleTime,
  });

  return {
    business: data?.data,
    isLoading,
  };
};
