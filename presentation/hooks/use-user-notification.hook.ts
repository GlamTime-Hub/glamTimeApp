import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserNotificationAction } from "@/core/actions/notification/get-user-notification.action";
import { markNotificationAsRead } from "../../core/actions/notification/mark-notification-as-read.action";

export const useUserNotifications = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: getUserNotificationAction,
    staleTime: 1000 * 60 * 60,
  });

  const markNotificationAsReadById = async (notificationId: string) => {
    await markNotificationAsRead(notificationId);
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
    queryClient.invalidateQueries({ queryKey: ["totalNotifications"] });
  };

  return {
    notifications: data?.data,
    isLoading,
    markNotificationAsReadById,
  };
};
