import axiosClient from "@/core/api/axios-client";

export const getPrivacyAction = async () => {
  try {
    const { data } = await axiosClient.get("util/privacy");
    
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
