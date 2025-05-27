import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import { getTotalUserNotificationAction } from "@/core/actions/notification/get-total-user-notification.action";
import useAuthStore from "@/core/store/auth.store";
import { useUserNotificationStore } from "../store/use-user-notification.store";

export const useTotalUserNotifications = () => {
  const { session } = useAuthStore();

  const { totalNotification, setTotalNotification } =
    useUserNotificationStore();

  const { data, isLoading } = useQuery({
    queryKey: ["totalNotifications"],
    queryFn: getTotalUserNotificationAction,
    staleTime: 1000 * 60 * 60,
    enabled: !!session,
  });

  useEffect(() => {
    setTotalNotification(data?.data);
  }, [data]);

  return {
    total: totalNotification,
    isLoading,
    session,
  };
};
