import axiosClient from "@/core/api/axios-client";

export const updateServiceAction = async (updateService: any) => {
  try {
    await axiosClient.post("services/update-service-by-id", updateService);

    return {
      status: true,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
