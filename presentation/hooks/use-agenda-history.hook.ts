import { getAllBookingByProfessionalAction } from "@/core/actions/booking/get-all-booking-by-professional.action";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useAgendaHistory = () => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["agenda-history"],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await getAllBookingByProfessionalAction(
          pageParam,
          10,
          "completed"
        );

        return {
          data: res.data,
          nextPage: res.data.length === 10 ? pageParam + 1 : null,
        };
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.nextPage,
    });

  const bookings = data?.pages.flatMap((page) => page.data) ?? [];

  return {
    bookings,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  };
};
