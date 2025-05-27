import axiosClient from "@/core/api/axios-client";
import { isAxiosError } from "axios";

export const sendInvitationAction = async (
  businessId: string,
  phoneNumber: string,
  phoneNumberExtension: string
) => {
  try {
    await axiosClient.put("business/send-invitation/" + businessId, {
      phoneNumber,
      phoneNumberExtension,
    });
    return {
      status: true,
    };
  } catch (error: any) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }

    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
