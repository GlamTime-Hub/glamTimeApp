import axiosClient from "@/core/api/axios-client";
import { ProfessionalMapper } from "@/core/mappers/professional.mapper";

export const getProfessionalByProfessionalIdAction = async (
  professionalId: string
) => {
  try {
    const { data } = await axiosClient.get(
      "professional/business-by-professional-id/" + professionalId
    );

    const professional = data.data
      ? ProfessionalMapper.fromTheProfessionalDBToProfessional(data.data)
      : null;

    return {
      status: true,
      data: professional,
    };
  } catch (error) {
    console.log("error perrro", error);
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
