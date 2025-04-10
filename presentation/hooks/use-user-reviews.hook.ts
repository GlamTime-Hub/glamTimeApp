import { getUserReviewsAction } from "@/core/actions/user/get-user-reviews";
import { useQuery } from "@tanstack/react-query";

const staleTime = 1000 * 60 * 60 * 24;

export const useUserReviews = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["my-reviews"],
    queryFn: getUserReviewsAction,
    staleTime,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return {
    data,
    isLoading,
  };
};
