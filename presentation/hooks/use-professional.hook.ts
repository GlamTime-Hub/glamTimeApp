import { getProfessionalById } from "@/core/actions/professional/get-professional-by-id.action";
import { useQuery } from "@tanstack/react-query";

const staleTime = 1000 * 60 * 60 * 24;

export const useProfessional = (userId: string, businessId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["schedule", `${userId}-${businessId}`],
    queryFn: () => getProfessionalById(userId, businessId),
    staleTime,
    enabled: !!userId,
  });

  return {
    professional: data?.data,
    isLoading,
    isError,
  };
};
