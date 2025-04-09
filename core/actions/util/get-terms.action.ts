import axiosClient from "@/core/api/axios-client";

export const getTermsAction = async () => {
  try {
    const { data } = await axiosClient.get("util/terms");

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
