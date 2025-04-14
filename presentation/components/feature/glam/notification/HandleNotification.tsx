import { UserNotification } from "@/core/interfaces/user-notification.interface";
import { NotificationInvitation } from "./NotificationInvitation";
import { NotificationInvitationRejected } from "./NotificationInvitationRejected";

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

  if (notification.type === "invitation-rejected") {
    return (
      <NotificationInvitationRejected
        notification={notification}
        markNotification={markNotification}
      />
    );
  }

  return;
};
