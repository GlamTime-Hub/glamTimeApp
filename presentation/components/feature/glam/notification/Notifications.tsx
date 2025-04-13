import { useUserNotifications } from "@/presentation/hooks/use-user-notification.hook";
import { ScrollView, View } from "react-native";
import { NotificationsLoading } from "./NotificationsLoading";
import { NotificationCard } from "./NotificationCard";
import { UserNotification } from "@/core/interfaces/user-notification.interface";
import { Bell } from "@/lib/icons/Icons";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/presentation/components/ui/alert";

export const Notifications = () => {
  const { notifications, isLoading } = useUserNotifications();

  if (isLoading) return <NotificationsLoading />;

  if (notifications.length === 0)
    return (
      <View className="p-2">
        <Alert icon={Bell} variant="default" className="max-w-xl">
          <AlertTitle>Info!</AlertTitle>
          <AlertDescription>No has recibido notificaciones.</AlertDescription>
        </Alert>
      </View>
    );

  return (
    <View className="flex-1 p-4">
      <ScrollView>
        {notifications.map((notification: UserNotification) => (
          <NotificationCard key={notification.id} notification={notification} />
        ))}
      </ScrollView>
    </View>
  );
};
