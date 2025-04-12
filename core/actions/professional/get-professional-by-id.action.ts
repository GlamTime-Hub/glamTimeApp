import axiosClient from "@/core/api/axios-client";
import { ProfessionalMapper } from "@/core/mappers/professional.mapper";

export const getProfessionalById = async (userId: string) => {
  try {
    const { data } = await axiosClient.get(
      "professional/get-professional-by-id/" + userId
    );

    const professional = ProfessionalMapper.fromTheProfessionalDBToProfessional(
      data.data
    );

    return {
      status: true,
      data: professional,
    };
  } catch (error) {
    console.log("error", error);
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
