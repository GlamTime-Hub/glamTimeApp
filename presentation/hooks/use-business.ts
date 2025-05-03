import { useLocationStore } from "@/core/store/location.store";
import { useBusinessFilterStore } from "../store/use-filter-business.store";
import { getHomeBusinessAction } from "@/core/actions/business/get-home-business.action";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useBusiness = () => {
  const { location } = useLocationStore();
  const { filter } = useBusinessFilterStore();
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["businesses"],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await getHomeBusinessAction({
          filter,
          location,
          page: pageParam,
          limit: 10,
        });

        return {
          data: res.data,
          nextPage: res.data.length === 10 ? pageParam + 1 : null,
        };
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  return { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage };
};
