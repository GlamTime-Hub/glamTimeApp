import Toast from "react-native-toast-message";
import useAuthStore from "@/core/store/auth.store";
import { Href, router } from "expo-router";
import { updateImageAction } from "@/core/actions/user/update-image.action";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../store/use-user.store";
import { useUser } from "./use-user.hook";

export const useProfileHome = () => {
  const { session, logout } = useAuthStore();
  const { logout: removeUserFromStorage } = useUserStore();

  const { user, isLoading } = useUser();

  const queryClient = useQueryClient();
  const handleOptions = (href: Href) => {
    router.push(href);
  };

  const onLogout = async () => {
    await removeUserFromStorage();
    await logout();
    queryClient.clear();
  };

  const updateImage = async (publicUrl: string) => {
    await updateImageAction(publicUrl);

    Toast.show({
      type: "success",
      text1: "Imagen actualizada",
      text2: "La imagen se ha actualizado correctamente",
    });

    await queryClient.refetchQueries({ queryKey: ["user"] });
  };

  return {
    session,
    user,
    isLoading,
    handleOptions,
    onLogout,
    updateImage,
  };
};
