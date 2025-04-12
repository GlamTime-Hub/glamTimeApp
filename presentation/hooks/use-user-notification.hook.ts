import { useQuery } from "@tanstack/react-query";
import { getUserNotificationAction } from "@/core/actions/notification/get-user-notification.action";

export const useUserNotifications = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: getUserNotificationAction,
    staleTime: 1000 * 60 * 60,
  });

  return {
    notifications: data?.data,
    isLoading,
  };
};
