import { getProfessionalsAction } from "@/core/actions/professional/get-professionals.action";
import useAuthStore from "@/core/store/auth.store";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import Toast from "react-native-toast-message";

const staleTime = 1000 * 60 * 60 * 24;

export const useBusinessProfessional = (businessId: string) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["business-professionals", `${businessId}`],
    queryFn: () => getProfessionalsAction(businessId),
    staleTime,
  });

  const { session } = useAuthStore();

  const goPrefessionalDetail = (id: string) => {
    if (!session) {
      router.push("/login/home");
      Toast.show({
        type: "info",
        text1: "Info!!",
        text2: "Para continuar debes iniciar sesión",
      });
      return;
    }

    router.push({
      pathname:
        "/glam/(tabs)/business/detail/professional-detail/[professionalId]",
      params: { professionalId: id, businessId },
    });
  };

  return {
    professionals: data?.data,
    isLoading,
    goPrefessionalDetail,
  };
};
