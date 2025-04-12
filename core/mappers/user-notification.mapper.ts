import { UserNotification } from "../interfaces/user-notification.interface";

export class UserNotificationMapper {
  static fromUserNotificationDBToUserNotification(
    userNotification: any
  ): UserNotification {
    return {
      id: userNotification._id,
      message: userNotification.message,
      userAuthId: userNotification.userAuthId,
      user: {
        id: userNotification.user._id,
        name: userNotification.user.name,
        urlPhoto: userNotification.user.urlPhoto,
      },
      business: {
        id: userNotification.business._id,
        name: userNotification.business.name,
        urlPhoto: userNotification.business.urlPhoto,
      },
      isRead: userNotification.isRead,
      createdAt: new Date(userNotification.createdAt),
      readAt: new Date(userNotification.readAt),
      type: userNotification.type,
    };
  }
}
