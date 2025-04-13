import axiosClient from "@/core/api/axios-client";

export const getProfessionalReviewsReceivedAction = async (
  professionalId: string
) => {
  try {
    const {
      data: { data },
    } = await axiosClient.get("professional/review/" + professionalId);

    return {
      status: true,
      data,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
