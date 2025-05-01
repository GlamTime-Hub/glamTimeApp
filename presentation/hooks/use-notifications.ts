import Toast from "react-native-toast-message";
import { useEffect, useState } from "react";
import { updateNotificationAction } from "@/core/actions/user/update-notifications.action";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { useUser } from "./use-user.hook";

export const useNotifications = () => {
  const queryClient = useQueryClient();
  const { user, isLoading } = useUser();
  const [loading, setLoading] = useState(false);

  const [notifications, setNotiications] = useState({
    push: user?.notificationPreference.push ?? false,
    news: user?.notificationPreference.news ?? false,
  });

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

    queryClient.invalidateQueries({ queryKey: ["user"] });

    Toast.show({
      type: "success",
      text1: "OK",
      text2: "Notificaciones actualizadas.",
    });

    router.back();

    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      setNotiications({
        push: user?.notificationPreference.push ?? false,
        news: user?.notificationPreference.news ?? false,
      });
    }
  }, [user]);

  return {
    user,
    loading,
    isLoading,
    notifications,
    setNotiications,
    onSaveNotifications,
  };
};
