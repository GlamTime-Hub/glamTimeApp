import axiosClient from "@/core/api/axios-client";

export const updateNotificationAction = async (notification: any) => {
  try {
    await axiosClient.post("user/update-notifications", notification);

    return {
      status: true,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
