import axiosClient from "@/core/api/axios-client";
import { Professional } from "@/core/interfaces/professional.interface";
import { ProfessionalMapper } from "@/core/mappers/professional.mapper";

export const getProfessionalDetailAction = async (
  id: string,
  businessId: string
) => {
  try {
    const { data } = await axiosClient.get(
      `professional/professional-detail/${id}/${businessId}`
    );

    const professional: Professional =
      ProfessionalMapper.fromTheProfessionalDBToProfessional(data.data);

    return {
      status: true,
      data: professional,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
