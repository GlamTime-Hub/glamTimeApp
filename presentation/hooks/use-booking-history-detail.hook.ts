import { getBookingHistoryDetailAction } from "@/core/actions/booking/get-booking-history-detail.action";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";

const staleTime = 1000 * 60 * 60 * 24;

export const useBookingHistoryDetail = () => {
  const { bookingId, fromProfessional } = useLocalSearchParams();

  const { data, isLoading } = useQuery({
    queryKey: ["booking-history-detail", bookingId],
    queryFn: () => getBookingHistoryDetailAction(bookingId as string),
    staleTime,
    enabled: !!bookingId,
  });

  return {
    booking: data?.data,
    isLoading,
    fromProfessional,
  };
};
