import { useQuery } from "@tanstack/react-query";
import { getTotalUserNotificationAction } from "@/core/actions/notification/get-total-user-notification.action";

export const useTotalUserNotifications = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["totalNotifications"],
    queryFn: getTotalUserNotificationAction,
    staleTime: 1000 * 60 * 60,
  });

  return {
    total: data?.data,
    isLoading,
  };
};
