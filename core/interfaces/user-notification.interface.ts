export interface UserNotification {
  id: string;
  body: string;
  title: string;

  fromUser: {
    user: string;
    name: string;
    urlPhoto: string;
    userAuthId: string;
  };
  toUser: {
    user: string;
    name: string;
    urlPhoto: string;
    userAuthId: string;
  };

  meta: {
    business: {
      id: string;
      name: string;
      urlPhoto: string;
    };

    professional: {
      id: string;
      name: string;
      urlPhoto: string;
    };

    booking: {
      id: string;
      date: Date;
      fullDate: string;
      startTime: number;
      endTime: number;
      status: string;
      serviceName: string;
    };
  };
  isRead: boolean;
  createdAt: Date;
  readAt: Date;
  type:
    | "invitation"
    | "invitation-accepted"
    | "invitation-rejected"
    | "reservation"
    | "reservation-accepted"
    | "reservation-rejected"
    | "review-received";
}
