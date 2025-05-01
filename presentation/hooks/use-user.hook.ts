import { getUserAction } from "@/core/actions/user/get-user.action";
import { useQuery } from "@tanstack/react-query";
const staleTime = 1000 * 60 * 60 * 24;

export const useUser = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getUserAction,
    staleTime,
  });

  return { user: data?.data, error, isError, isLoading };
};
