import axiosClient from "@/core/api/axios-client";

export const updateProfessionalById = async (professional: any) => {
  try {
    await axiosClient.post("professional/update-professional", {
      professional,
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
