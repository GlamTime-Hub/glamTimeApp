import axiosClient from "@/core/api/axios-client";
import { Professional } from "@/core/interfaces/professional.interface";
import { ProfessionalMapper } from "@/core/mappers/professional.mapper";

export const getProfessionalWithActiveServiceAction = async (
  businessId: string,
  serviceId: string
) => {
  try {
    const { data } = await axiosClient.get(
      "professional/get-professional-with-active-service/" +
        businessId +
        "/" +
        serviceId
    );

    const professionals: Professional[] = data.data.map((professional: any) =>
      ProfessionalMapper.fromTheProfessionalDBToProfessional(professional)
    );

    return {
      status: true,
      data: professionals,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
