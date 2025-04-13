import axiosClient from "@/core/api/axios-client";

export const markNotificationAsRead = async (notificationId: string) => {
  try {
    const {
      data: { data },
    } = await axiosClient.get(
      "notification/mark-notification-as-read/" + notificationId
    );

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
