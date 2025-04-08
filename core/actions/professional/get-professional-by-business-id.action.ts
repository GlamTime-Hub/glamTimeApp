import axiosClient from "@/core/api/axios-client";
import { ProfessionalMapper } from "@/core/mappers/professional.mapper";

export const getProfessionalByBusinessIdAction = async (businessId: string) => {
  try {
    const { data } = await axiosClient.get(
      "professional/get-professional-by-business-id/" + businessId
    );

    console.log("data", data);

    const professionals = data.data.map((professional: any) =>
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
