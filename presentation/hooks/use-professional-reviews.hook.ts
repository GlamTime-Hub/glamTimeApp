import { getProfessionalReviewsReceivedAction } from "@/core/actions/professional/get-professional-reviews-received";
import { useQuery } from "@tanstack/react-query";

const staleTime = 1000 * 60 * 60 * 24;

export const useProfessionalReview = (userId: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["review-received"],
    queryFn: () => getProfessionalReviewsReceivedAction(userId),
    staleTime,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!userId,
  });

  return {
    data,
    isLoading,
  };
};
