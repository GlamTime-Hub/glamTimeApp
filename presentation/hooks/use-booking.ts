import { useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useState } from "react";
import Toast from "react-native-toast-message";

import { getBookingByUserAction } from "@/core/actions/booking/get-booking-by-user.action";
import { BookingDetail } from "@/core/interfaces/booking-detail.interface";
import useAuthStore from "@/core/store/auth.store";
import { useUserStore } from "../store/use-user.store";
import { cancelBookingByUserAction } from "@/core/actions/booking/cancel-booking-by-user.action";

const staleTime = 1000 * 60 * 60 * 24;

export const useBooking = () => {
  const [loading, setLoading] = useState(false);

  const { session } = useAuthStore();

  const { user } = useUserStore();

  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: getBookingByUserAction,
    staleTime,
    enabled: !!session,
  });

  const onCancelBooking = async (booking: BookingDetail) => {
    setLoading(true);

    const cancel = {
      to: {
        userAuthId: booking?.professional.userAuthId,
        user: booking?.professional.userId,
      },
      from: {
        userAuthId: session?.user.id,
        user: user?.id,
      },
      business: booking.business.id,
      professional: booking.professional.id,
      bookingId: booking?.id,
    };

    await cancelBookingByUserAction(cancel);

    queryClient.invalidateQueries({ queryKey: ["bookings"] });
    queryClient.invalidateQueries({ queryKey: ["totalNotifications"] });
    queryClient.invalidateQueries({ queryKey: ["notifications"] });

    Toast.show({
      type: "success",
      text1: "Reserva cancelada.",
      text2: "El profesional ha sido notificado.",
    });

    setLoading(false);
  };

  const onFeedback = (id: string, bookingId: string, isBusiness: boolean) => {
    if (isBusiness) {
      router.push({
        pathname: "/glam/(tabs)/booking/feedback/business/[id]",
        params: {
          id,
          bookingId,
        },
      });
    }

    router.push({
      pathname: "/glam/(tabs)/booking/feedback/professional/[id]",
      params: {
        id,
        bookingId,
      },
    });
  };

  return {
    user,
    bookings: data?.data,
    isLoading,
    loading,
    session,
    onCancelBooking,
    onFeedback,
  };
};
