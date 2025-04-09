import axiosClient from "@/core/api/axios-client";
import { ActiveService } from "@/core/interfaces/active-service.interface";

export const activeServiceAction = async (activeService: ActiveService) => {
  try {
    await axiosClient.post(
      "services/active-service-by-business",
      activeService
    );

    return {
      status: true,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
