import axiosClient from "@/core/api/axios-client";
import { Booking } from "@/core/interfaces/booking.interface";
import { BookingMapper } from "@/core/mappers/booking.mapper";

export const getBookingByProfessionalAction = async (
  professionalId: string,
  businessId: string
) => {
  try {
    const { data } = await axiosClient.get(
      `booking/bookings-by-professional-id/${professionalId}/${businessId}`
    );

    const bookings: Booking[] = data.data.map((booking: any) =>
      BookingMapper.fromBookingDBtoBooking(booking)
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
