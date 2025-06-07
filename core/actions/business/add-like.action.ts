import axiosClient from "@/core/api/axios-client";

export const addBusinessLikeAction = async (
  businessId: string,
  userId: string
) => {
  try {
    await axiosClient.post("business/add-like", {
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
