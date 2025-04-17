import { getBusinessAction } from "@/core/actions/business/get-business.action";
import { useQuery } from "@tanstack/react-query";
const staleTime = 1000 * 60 * 60 * 24;

export const useProfileBusiness = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["business"],
    queryFn: getBusinessAction,
    staleTime,
  });

  return {
    data: data?.data,
    isLoading,
    error,
    isError,
  };
};
