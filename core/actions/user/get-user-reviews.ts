import axiosClient from "@/core/api/axios-client";

export const getUserReviewsAction = async () => {
  try {
    const {
      data: { data },
    } = await axiosClient.get("user/reviews");

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
