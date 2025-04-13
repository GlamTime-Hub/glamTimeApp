import axiosClient from "@/core/api/axios-client";

export const handleInvitaionAction = async (invitation: any) => {
  try {
    await axiosClient.post("professional/handle-invitation", {
      invitation,
    });
    return {
      status: true,
    };
  } catch (error) {
    console.log("error", error);
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
