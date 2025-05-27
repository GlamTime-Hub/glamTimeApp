import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserNotificationAction } from "@/core/actions/notification/get-user-notification.action";
import { markNotificationAsRead } from "../../core/actions/notification/mark-notification-as-read.action";
import useAuthStore from "@/core/store/auth.store";

export const useUserNotifications = () => {
  const queryClient = useQueryClient();
  const { session } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: getUserNotificationAction,
    staleTime: 1000 * 60 * 60,
    enabled: !!session,
  });

  const markNotificationAsReadById = async (notificationId: string) => {
    await markNotificationAsRead(notificationId);
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
    queryClient.invalidateQueries({ queryKey: ["totalNotifications"] });
  };

  return {
    session,
    notifications: data?.data,
    isLoading,
    markNotificationAsReadById,
  };
};
