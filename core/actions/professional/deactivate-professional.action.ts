import axiosClient from "@/core/api/axios-client";

export const deactivateProfessionalAction = async (
  professionalId: string,
  businessId: string
) => {
  try {
    await axiosClient.post("professional/deactivate-professional", {
      id: professionalId,
      businessId,
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
