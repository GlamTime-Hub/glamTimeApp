import axiosClient from "@/core/api/axios-client";

export const updateImageAction = async (urlPhoto: string) => {
  try {
    await axiosClient.post("user/update-image", { urlPhoto });

    return {
      status: true,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
