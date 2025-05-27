import axiosClient from "@/core/api/axios-client";

export const newProfessionalReviewAction = async (review: any) => {
  try {
    await axiosClient.post("professional/review", {
      ...review,
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
