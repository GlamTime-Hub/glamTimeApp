import { useUserNotifications } from "@/presentation/hooks/use-user-notification.hook";
import { ScrollView, View } from "react-native";
import { NotificationsLoading } from "./NotificationsLoading";
import { UserNotification } from "@/core/interfaces/user-notification.interface";
import { HandleNotification } from "./HandleNotification";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";

export const Notifications = () => {
  const { notifications, isLoading, markNotificationAsReadById } =
    useUserNotifications();

  if (isLoading) return <NotificationsLoading />;

  if (notifications.length === 0)
    return (
      <View className="p-2">
        <CustomAlert
          title="Info!!!"
          description="No has recibido notificaciones."
          type="destructive"
        />
      </View>
    );

  return (
    <View className="flex-1 p-4">
      <ScrollView>
        {notifications.map((notification: UserNotification) => (
          <HandleNotification
            key={notification.id}
            notification={notification}
            markNotification={markNotificationAsReadById}
          />
        ))}
      </ScrollView>
    </View>
  );
};
