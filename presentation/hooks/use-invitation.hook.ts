import { useState } from "react";
import { useUserNotificationStore } from "../store/use-user-notification.store";
import { useQueryClient } from "@tanstack/react-query";
import { handleInvitaionAction } from "@/core/actions/professional/handle-invitation.action";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

export const useInvitation = () => {
  const { notification } = useUserNotificationStore();

  const [loading, setLoading] = useState(false);
  const [loadingReject, setLoadingReject] = useState(false);

  const queryClient = useQueryClient();

  const handleAccept = async () => {
    setLoading(true);
    const accept = {
      notificationId: notification?.id,
      fromUser: notification?.fromUser,
      toUser: notification?.toUser,
      invitationStatus: "invitation-accepted",
      businessId: notification?.meta.business.id,
    };

    await handleInvitaionAction(accept);
    setLoading(false);
    queryClient.invalidateQueries({ queryKey: ["totalNotifications"] });
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
    queryClient.invalidateQueries({ queryKey: ["user"] });

    Toast.show({
      type: "success",
      text1: "Invitación aceptada",
      text2: "La invitación ha sido aceptada con éxito.",
    });

    router.push({
      pathname: "/glam/(tabs)/business/detail/home/[id]",
      params: { id: notification!.meta.business.id },
    });
  };

  const handleReject = async () => {
    setLoadingReject(true);
    const reject = {
      notificationId: notification?.id,
      fromUser: notification?.fromUser,
      toUser: notification?.toUser,
      invitationStatus: "invitation-rejected",
      businessId: notification?.meta.business.id,
    };

    await handleInvitaionAction(reject);

    Toast.show({
      type: "success",
      text1: "Invitación rechazada",
      text2: "La invitación ha sido rechazada con éxito.",
    });

    setLoadingReject(false);
    queryClient.invalidateQueries({ queryKey: ["totalNotifications"] });
    queryClient.invalidateQueries({ queryKey: ["notifications"] });
    queryClient.invalidateQueries({ queryKey: ["user"] });

    router.push("/glam/(tabs)/home");
  };

  return {
    notification,
    loading,
    loadingReject,
    handleAccept,
    handleReject,
  };
};
