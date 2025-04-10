import { getUserAction } from "@/core/actions/user/get-user.action";
import { useQuery } from "@tanstack/react-query";

const staleTime = 1000 * 60 * 60 * 24;

export const useUser = (id: string) => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserAction,
    staleTime,
    enabled: !!id,
  });

  return { user: data?.data, error, isError, isLoading };
};
