import { useState } from "react";
import Toast from "react-native-toast-message";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { sendInvitationAction } from "@/core/actions/business/send-invitation.action";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getProfessionalByBusinessIdAction } from "@/core/actions/professional/get-professional-by-business-id.action";
import { deactivateProfessionalAction } from "@/core/actions/professional/deactivate-professional.action";

import { zodResolver } from "@hookform/resolvers/zod";
import { CountryPhone } from "@/core/interfaces/country-phone.interface";

const staleTime = 1000 * 60 * 60 * 24;

const schema = z.object({
  phoneNumber: z
    .string()
    .nonempty("Debes ingresar número de contacto del profesional"),
  phoneNumberExtension: z.string(),
});

type FormData = z.infer<typeof schema>;

export const useBusinessMyProfessionals = (businessId: string) => {
  const [loading, setLoading] = useState<boolean>(false);

  const queryClient = useQueryClient();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["professionals", businessId],
    queryFn: () => getProfessionalByBusinessIdAction(businessId, false),
    staleTime,
  });

  const {
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      phoneNumber: "",
      phoneNumberExtension: "+57",
    },
  });

  const onChangePhone = (phoneNumber: string) => {
    setValue("phoneNumber", phoneNumber.length === 0 ? "" : `${phoneNumber}`);

    if (phoneNumber.length > 0) {
      clearErrors("phoneNumber");
    }
  };

  const onChangeCountry = (country: CountryPhone) => {
    setValue("phoneNumberExtension", `${country?.callingCode}`);
  };

  const onSendInvitation = async (data: FormData) => {
    setLoading(true);
    try {
      await sendInvitationAction(
        businessId,
        data.phoneNumber,
        data.phoneNumberExtension
      );

      Toast.show({
        type: "success",
        text1: "Invitación enviada",
        text2: "El profesional ha sido invitado correctamente",
      });

      reset();

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
    errors,
    professionals: data?.data,
    isLoadingProfessionals: isLoading,
    isErrorProfessionals: isError,
    loading,
    handleSubmit,
    onSendInvitation,
    onDeactivateProfessional,
    onChangeCountry,
    onChangePhone,
  };
};
