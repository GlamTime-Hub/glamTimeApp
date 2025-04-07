import Toast from "react-native-toast-message";
import { useUser } from "./use-user.hook";
import { useState } from "react";
import { updateNotificationAction } from "@/core/actions/user/update-notifications.action";
import { queryClient } from "@/core/config/query-client";

export const useNotifications = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  const onSaveNotifications = async (
    notificationsPush: boolean,
    notificationNews: boolean
  ) => {
    setLoading(true);

    await updateNotificationAction({
      notificationPreference: {
        push: notificationsPush,
        news: notificationNews,
      },
    });

    queryClient.invalidateQueries({ queryKey: ["user", "getUser"] });

    Toast.show({
      type: "success",
      text1: "Notificaciones guardadas",
      text2: "Tus preferencias de notificaciones han sido guardadas con éxito.",
    });

    setLoading(false);
  };

  return {
    user,
    loading,
    onSaveNotifications,
  };
};
