import { getBookingByUserAction } from "@/core/actions/booking/get-booking-by-user.action";
import { useQuery } from "@tanstack/react-query";

const staleTime = 1000 * 60 * 60 * 24;

export const useBooking = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookingByUserAction,
    staleTime,
  });

  return {
    bookings: data?.data,
    isLoading,
  };
};
