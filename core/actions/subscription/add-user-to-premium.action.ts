import axiosClient from "@/core/api/axios-client";

export const addUserToPremiumAction = async () => {
  try {
    await axiosClient.get("subscription/add-user-to-premium");

    return {
      status: true,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
