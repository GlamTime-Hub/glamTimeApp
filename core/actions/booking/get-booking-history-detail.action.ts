import axiosClient from "@/core/api/axios-client";
import { BookingHistoryDetail } from "@/core/interfaces/booking-history-detail.interface";
import { BookingHistoryDetailMapper } from "@/core/mappers/booking-history-detail.mapper";

export const getBookingHistoryDetailAction = async (bookingId: string) => {
  try {
    const { data } = await axiosClient.get(
      "booking/get-booking-history-detail/" + bookingId
    );

    const bookingHistoryDetail: BookingHistoryDetail =
      BookingHistoryDetailMapper.fromBookingDBToBookingDetail(data.data);

    return {
      status: true,
      data: bookingHistoryDetail,
    };
  } catch (error: any) {
    const message =
      error.status === 409
        ? "409"
        : "Ha ocurrido un error inesperado.\npor favor contacte con soporte";
    throw new Error(message);
  }
};
