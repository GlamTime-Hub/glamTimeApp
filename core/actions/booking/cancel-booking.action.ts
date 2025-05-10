import axiosClient from "@/core/api/axios-client";

export const cancelBookingAction = async (
  bookingId: string,
  reason: string
) => {
  try {
    await axiosClient.put("booking/cancel-booking/" + bookingId, {
      reason,
    });

    return {
      status: true,
    };
  } catch (error: any) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
