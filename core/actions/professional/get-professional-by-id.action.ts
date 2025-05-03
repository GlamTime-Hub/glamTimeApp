import axiosClient from "@/core/api/axios-client";
import { ProfessionalMapper } from "@/core/mappers/professional.mapper";

export const getProfessionalById = async (
  userId: string,
  businessId: string
) => {
  try {
    const { data } = await axiosClient.get(
      "professional/get-professional-by-id/" + userId + "/" + businessId
    );

    const professional = data.data
      ? ProfessionalMapper.fromTheProfessionalDBToProfessional(data.data)
      : null;

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
