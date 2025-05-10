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
