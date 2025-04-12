import axiosClient from "@/core/api/axios-client";
import { UserNotificationMapper } from "@/core/mappers/user-notification.mapper";

export const getUserNotificationAction = async () => {
  try {
    const {
      data: { data },
    } = await axiosClient.get("notification/get-notification-by-user-id");

    const notifications = data.map((notification: any) =>
      UserNotificationMapper.fromUserNotificationDBToUserNotification(
        notification
      )
    );

    return {
      status: true,
      data: notifications,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
