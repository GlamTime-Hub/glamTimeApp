import { UserNotification } from "@/core/interfaces/user-notification.interface";
import { NotificationInvitation } from "./NotificationInvitation";

interface Props {
  notification: UserNotification;
  markNotification: (notificationId: string) => Promise<void>;
}

export const HandleNotification = ({
  notification,
  markNotification,
}: Props) => {
  if (
    notification.type === "invitation" ||
    notification.type === "invitation-accepted"
  ) {
    return (
      <NotificationInvitation
        notification={notification}
        markNotification={markNotification}
      />
    );
  }
  return;
};
