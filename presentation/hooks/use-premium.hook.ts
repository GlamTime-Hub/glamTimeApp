import { addUserToPremiumAction } from "@/core/actions/subscription/add-user-to-premium.action";
import { getSubscriptionByUser } from "@/core/actions/subscription/get-subscription-by-user.action";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Toast from "react-native-toast-message";

const staleTime = 1000 * 60 * 60 * 24;

export const usePremium = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["user-premium"],
    queryFn: getSubscriptionByUser,
    staleTime,
  });

  const requestPremium = async () => {
    setLoading(true);

    await addUserToPremiumAction();

    setLoading(false);

    queryClient.invalidateQueries({ queryKey: ["user-premium"] });

    Toast.show({
      type: "success",
      text1: "Premium",
      text2: "Solicitud enviada.",
    });
  };

  return {
    data: data?.data,
    isLoading,
    loading,
    requestPremium,
  };
};
