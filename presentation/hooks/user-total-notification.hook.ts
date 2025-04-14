import { useQuery } from "@tanstack/react-query";
import { getTotalUserNotificationAction } from "@/core/actions/notification/get-total-user-notification.action";
import useAuthStore from "@/core/store/auth.store";

export const useTotalUserNotifications = () => {
  const { session } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["totalNotifications"],
    queryFn: getTotalUserNotificationAction,
    staleTime: 1000 * 60 * 60,
    enabled: !!session,
  });

  return {
    total: data?.data,
    isLoading,
  };
};
