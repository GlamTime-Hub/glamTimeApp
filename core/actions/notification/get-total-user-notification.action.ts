import axiosClient from "@/core/api/axios-client";

export const getTotalUserNotificationAction = async () => {
  try {
    const {
      data: { data },
    } = await axiosClient.get("notification/get-total-notification-by-user-id");
    console.log("data", data);

    return {
      status: true,
      data,
    };
  } catch (error) {
    console.log("error", error);
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
