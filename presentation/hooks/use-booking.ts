import { cancelBookingAction } from "@/core/actions/booking/cancel-booking.action";
import { getBookingByUserAction } from "@/core/actions/booking/get-booking-by-user.action";
import useAuthStore from "@/core/store/auth.store";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Toast from "react-native-toast-message";

const staleTime = 1000 * 60 * 60 * 24;

export const useBooking = () => {
  const [loading, setLoading] = useState(false);

  const { session } = useAuthStore();

  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookingByUserAction,
    staleTime,
    enabled: !!session,
  });

  const cancelBooking = async (bookingId: string, reason: string) => {
    setLoading(true);
    await cancelBookingAction(bookingId, reason);

    queryClient.invalidateQueries({ queryKey: ["bookings"] });

    Toast.show({
      type: "success",
      text1: "Ok.",
      text2: "Cita cancelada.",
    });

    setLoading(false);
  };

  return {
    bookings: data?.data,
    isLoading,
    loading,
    session,
    cancelBooking,
  };
};
