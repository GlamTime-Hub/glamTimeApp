import axiosClient from "@/core/api/axios-client";

export const deactivateProfessionalAction = async (
  professionalId: string,
  businessId: string,
  userId: string
) => {
  try {
    await axiosClient.post("professional/deactivate-professional", {
      id: professionalId,
      businessId,
      userId,
    });

    return {
      status: true,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
