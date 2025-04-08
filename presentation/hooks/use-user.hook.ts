import { getUserAction } from "@/core/actions/user/get-user.action";
import { useQuery } from "@tanstack/react-query";

const staleTime = 1000 * 60 * 60 * 24;

export const useUser = (userAuthId?: string) => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["user", userAuthId],
    queryFn: getUserAction,
    staleTime,
    enabled: !!userAuthId,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  return { user: data?.data, error, isError, isLoading };
};
