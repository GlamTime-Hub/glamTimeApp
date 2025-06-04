import { getBusinessByProfessionalIdAction } from "@/core/actions/business/get-business-by-professional-id.action";
import { useQuery } from "@tanstack/react-query";
const staleTime = 1000 * 60 * 60 * 24;
export const useBusinessProfessional = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["business-professionals"],
    queryFn: () => getBusinessByProfessionalIdAction(),
    staleTime,
  });

  return {
    data: data?.data,
    isLoading,
    error,
    isError,
  };
};
