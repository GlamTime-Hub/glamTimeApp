import { useLocationStore } from "@/core/store/location.store";
import { useBusinessFilterStore } from "../store/use-filter-business.store";
import { getHomeBusinessAction } from "@/core/actions/business/get-home-business.action";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useUserStore } from "../store/use-user.store";
import { useEffect } from "react";

export const useBusiness = () => {
  const { location } = useLocationStore();
  const { filter, isInitialized, initializeDefaults } =
    useBusinessFilterStore();
  const { user } = useUserStore();

  useEffect(() => {
    if (!isInitialized) {
      const city = user?.city ?? "";
      const country = user?.country ?? "";
      initializeDefaults(city, country);
    }
  }, [user]);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["businesses", filter],
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
      enabled: isInitialized,
    });

  return { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage };
};
