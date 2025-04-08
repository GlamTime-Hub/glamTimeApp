import axiosClient from "@/core/api/axios-client";

export const updateImageAction = async (id: string, urlPhoto: string) => {
  try {
    await axiosClient.post("business/update-image", { id, urlPhoto });

    return {
      status: true,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
