import { UserNotification } from "../interfaces/user-notification.interface";

export class UserNotificationMapper {
  static fromUserNotificationDBToUserNotification(
    userNotification: any
  ): UserNotification {
    return {
      id: userNotification._id,
      title: userNotification.title,
      body: userNotification.body,
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
      meta: {
        business: {
          id: userNotification.meta.business.id,
          name: userNotification.meta.business.name,
          urlPhoto: userNotification.meta.business.urlPhoto,
        },
        professional: {
          id: userNotification.meta.professional.id,
          name: userNotification.meta.professional.name,
          urlPhoto: userNotification.meta.professional.urlPhoto,
        },
        booking: {
          id: userNotification.meta.booking.id,
          date: new Date(userNotification.meta.booking.date),
          fullDate: userNotification.meta.booking.fullDate,
          startTime: userNotification.meta.booking.startTime,
          endTime: userNotification.meta.booking.endTime,
          status: userNotification.meta.booking.status,
          serviceName: userNotification.meta.booking.serviceName,
        },
      },
      isRead: userNotification.isRead,
      createdAt: new Date(userNotification.createdAt),
      readAt: new Date(userNotification.readAt),
      type: userNotification.type,
    };
  }
}
