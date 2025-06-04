import axiosClient from "@/core/api/axios-client";

export const removeProfessionalServiceAction = async (service: string) => {
  try {
    await axiosClient.delete("professional/delete-service/" + service);
    return {
      status: true,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
