import { getAllBookingByProfessionalAction } from "@/core/actions/booking/get-all-booking-by-professional.action";
import useAuthStore from "@/core/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const staleTime = 0;

export const useAgenda = () => {
  const { session } = useAuthStore();

  const [loading, setLoading] = useState(false);

  const { data, isError, isLoading } = useQuery({
    queryKey: ["professional-bookings"],
    queryFn: getAllBookingByProfessionalAction,
    staleTime,
    enabled: !!session,
  });

  return {
    bookings: data?.data,
    isLoading,
    loading,
    session,
  };
};
