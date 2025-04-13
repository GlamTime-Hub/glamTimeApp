import { UserNotification } from "../interfaces/user-notification.interface";

export class UserNotificationMapper {
  static fromUserNotificationDBToUserNotification(
    userNotification: any
  ): UserNotification {
    return {
      id: userNotification._id,
      message: userNotification.message,
      fromUser: {
        user: userNotification.fromUser._id,
        name: userNotification.fromUser.name,
        urlPhoto: userNotification.fromUser.urlPhoto,
        userAuthId: userNotification.fromUser.userAuthId,
      },
      toUser: {
        user: userNotification.toUser._id,
        name: userNotification.toUser.name,
        urlPhoto: userNotification.toUser.urlPhoto,
        userAuthId: userNotification.toUser.userAuthId,
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
