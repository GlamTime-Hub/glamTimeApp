import { useUserNotifications } from "@/presentation/hooks/use-user-notification.hook";
import { View } from "react-native";
import { NotificationsLoading } from "./NotificationsLoading";
import { CustomAlert } from "@/presentation/components/ui/CustomAlert";
import { FlatList } from "react-native-gesture-handler";
import { Notification } from "./Notification";
import { NotificationCard } from "./NotificationCard";

export const Notifications = () => {
  const { notifications, isLoading, session, markNotificationAsReadById } =
    useUserNotifications();

  if (!session) {
    return (
      <View className="p-2">
        <CustomAlert
          title="Info!!!"
          description="Inicia sesión para revisar tus notificaciones."
          type="info"
        />
      </View>
    );
  }

  if (isLoading) return <NotificationsLoading />;

  if (notifications.length === 0)
    return (
      <View className="p-2">
        <CustomAlert
          title="Info!!!"
          description="No has recibido notificaciones."
          type="info"
        />
      </View>
    );

  return (
    <View className="flex-1">
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <Notification notification={item}>
            <NotificationCard notification={item} />
          </Notification>
        )}
        keyExtractor={(_, index) => `message-${index}`}
      />
    </View>
  );
};
