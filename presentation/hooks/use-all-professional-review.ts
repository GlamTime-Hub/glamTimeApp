import { getProfessionalReviewsByProfessionalIdAction } from "@/core/actions/professional/get-professional-reviews-by-professional-id.action";
import { useQuery } from "@tanstack/react-query";

const staleTime = 1000 * 60 * 60 * 24;

export const useAllProfessionalReview = (professionalId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["professional-review", professionalId],
    queryFn: () => getProfessionalReviewsByProfessionalIdAction(professionalId),
    staleTime,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!professionalId,
  });

  return {
    data,
    isLoading,
  };
};
