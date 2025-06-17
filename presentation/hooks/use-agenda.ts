import { useQuery } from "@tanstack/react-query";

import { getAllBookingByProfessionalAction } from "@/core/actions/booking/get-all-booking-by-professional.action";
import useAuthStore from "@/core/store/auth.store";

const staleTime = 0;

export const useAgenda = () => {
  const { session } = useAuthStore();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["agenda"],
    queryFn: () => getAllBookingByProfessionalAction(1, 10, "confirmed"),
    staleTime,
    enabled: !!session,
  });

  return {
    bookings: data?.data,
    isLoading,
    session,
  };
};
