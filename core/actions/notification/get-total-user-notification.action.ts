import axiosClient from "@/core/api/axios-client";

export const getTotalUserNotificationAction = async () => {
  try {
    const {
      data: { data },
    } = await axiosClient.get("notification/get-total-notification-by-user-id");

    return {
      status: true,
      data,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
