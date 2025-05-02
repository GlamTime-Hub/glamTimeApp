import axiosClient from "@/core/api/axios-client";
import { ProfessionalMapper } from "@/core/mappers/professional.mapper";

export const getProfessionalById = async (userId: string) => {
  try {
    const { data } = await axiosClient.get(
      "professional/get-professional-by-id/" + userId
    );

    console.log("data", data);

    const professional = data.data
      ? ProfessionalMapper.fromTheProfessionalDBToProfessional(data.data)
      : null;

    console.log("profesiion", professional);

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
