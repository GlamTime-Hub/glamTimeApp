import axiosClient from "@/core/api/axios-client";
import { BookingDetail } from "@/core/interfaces/booking-detail.interface";
import { BookingDetailMapper } from "@/core/mappers/booking-detail.mapper";

export const getBookingByUserAction = async (
  page: number,
  limit: number,
  status: string
) => {
  try {
    const { data } = await axiosClient.post("booking/bookings-by-user", {
      status,
      page,
      limit,
    });

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
