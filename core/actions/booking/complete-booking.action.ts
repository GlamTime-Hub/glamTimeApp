import axiosClient from "@/core/api/axios-client";

export const completeBookingAction = async (bookingId: string) => {
  try {
    await axiosClient.get("booking/complete-booking/" + bookingId);

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
