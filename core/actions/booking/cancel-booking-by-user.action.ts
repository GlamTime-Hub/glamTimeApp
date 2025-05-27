import axiosClient from "@/core/api/axios-client";

export const cancelBookingByUserAction = async (booking: any) => {
  try {
    await axiosClient.post("booking/cancel-booking-by-user", {
      ...booking,
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
