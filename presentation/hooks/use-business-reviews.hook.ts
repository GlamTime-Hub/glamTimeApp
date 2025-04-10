import { getBusinessReviewsAction } from "@/core/actions/business/get-business-reviews.action";
import { useQuery } from "@tanstack/react-query";

const staleTime = 1000 * 60 * 60 * 24;

export const useBusinessReviews = (id: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["business-reviews", id],
    queryFn: () => getBusinessReviewsAction(id),
    staleTime,
  });

  return { businessReviews: data?.data, isLoading };
};
