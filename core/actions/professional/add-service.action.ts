import axiosClient from "@/core/api/axios-client";

export const newProfessionalServiceAction = async (service: any) => {
  try {
    await axiosClient.post("professional/add-service", {
      ...service,
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
