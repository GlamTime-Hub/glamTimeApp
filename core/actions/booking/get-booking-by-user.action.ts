import axiosClient from "@/core/api/axios-client";
import { BookingDetail } from "@/core/interfaces/booling-detail.interface";
import { BookingDetailMapper } from "@/core/mappers/booking-detail.mapper";

export const getBookingByUserAction = async () => {
  try {
    const { data } = await axiosClient.get("booking/bookings-by-user");

    const bookings: BookingDetail[] = data.data.map((booking: any) =>
      BookingDetailMapper.fromBookingDetailDBToBookingDetail(booking)
    );

    return {
      status: true,
      data: bookings,
    };
  } catch (error: any) {
    const message =
      error.status === 409
        ? "409"
        : "Ha ocurrido un error inesperado.\npor favor contacte con soporte";
    throw new Error(message);
  }
};
