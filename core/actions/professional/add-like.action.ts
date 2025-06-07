import axiosClient from "@/core/api/axios-client";

export const addProfessionalLikeAction = async (
  professionalId: string,
  userId: string
) => {
  try {
    await axiosClient.post("professional/add-like", {
      professionalId,
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
