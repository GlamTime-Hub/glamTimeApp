import axiosClient from "@/core/api/axios-client";
import { Booking } from "@/core/interfaces/booking.interface";

export const addNewBookingAction = async (booking: Booking) => {
  try {
    await axiosClient.post("booking/add-new-booking", {
      booking,
    });

    return {
      status: true,
    };
  } catch (error: any) {
    const message =
      error.status === 409
        ? "409"
        : "Ha ocurrido un error inesperado.\npor favor contacte con soporte";
    throw new Error(message);
  }
};
