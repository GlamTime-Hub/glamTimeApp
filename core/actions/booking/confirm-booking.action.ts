import axiosClient from "@/core/api/axios-client";

export const confirmBookingAction = async (confirm: any) => {
  try {
    await axiosClient.post("booking/confirm-booking", {
      ...confirm,
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
