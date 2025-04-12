import { useState } from "react";
import Toast from "react-native-toast-message";

import { sendInvitationAction } from "@/core/actions/business/send-invitation.action";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfessionalByBusinessIdAction } from "@/core/actions/professional/get-professional-by-business-id.action";
import { deactivateProfessionalAction } from "@/core/actions/professional/deactivate-professional.action";

const staleTime = 1000 * 60 * 60 * 24;

export const useBusinessMyProfessionals = (businessId: string) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["professionals", businessId],
    queryFn: () => getProfessionalByBusinessIdAction(businessId),
    staleTime,
  });

  const onSendInvitation = async () => {
    if (!email) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "El email es requerido",
      });
      return;
    }
    setLoading(true);
    try {
      await sendInvitationAction(businessId, email);

      Toast.show({
        type: "success",
        text1: "Invitación enviada",
        text2: "El profesional ha sido invitado correctamente",
      });
      setEmail("");
      queryClient.invalidateQueries({
        queryKey: ["professionals", businessId],
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: error.message,
      });
    }
    setLoading(false);
  };

  const onDeactivateProfessional = async (professionalId: string) => {
    setLoading(true);
    await deactivateProfessionalAction(professionalId, businessId);

    Toast.show({
      type: "success",
      text1: "Invitación desactivada",
      text2: "La invitación ha sido desactivada correctamente",
    });

    queryClient.invalidateQueries({ queryKey: ["professionals", businessId] });
    setLoading(false);
  };

  return {
    professionals: data?.data,
    isLoadingProfessionals: isLoading,
    isErrorProfessionals: isError,
    loading,
    email,
    setEmail,
    onSendInvitation,
    onDeactivateProfessional,
  };
};
