import Toast from "react-native-toast-message";
import useAuthStore from "@/core/store/auth.store";
import { useUser } from "./use-user.hook";
import { Href, router } from "expo-router";
import { updateImageAction } from "@/core/actions/user/update-image.action";
import { useQueryClient } from "@tanstack/react-query";

export const useProfileHome = () => {
  const { session, logout } = useAuthStore();
  const { user, error, isError, isLoading } = useUser();

  const isProfessional = ["professional", "admin"].includes(user?.role!);

  const queryClient = useQueryClient();

  const handleOptions = (href: Href) => {
    router.push(href);
  };

  const onLogout = async () => {
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

    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return {
    session,
    user,
    error,
    isError,
    isLoading,
    isProfessional,
    handleOptions,
    onLogout,
    updateImage,
  };
};
