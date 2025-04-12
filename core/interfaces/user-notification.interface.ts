export interface UserNotification {
  id: string;
  message: string;
  userAuthId: string;
  user: {
    id: string;
    name: string;
    urlPhoto: string;
  };
  business: {
    id: string;
    name: string;
    urlPhoto: string;
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
