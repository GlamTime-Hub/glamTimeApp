import axiosClient from "@/core/api/axios-client";
import { ProfessionalWithBusiness } from "@/core/interfaces/business-professional.interface";
import { ProfessionalWithBusinessMapper } from "@/core/mappers/professional-with-business.mapper";

export const getBusinessByProfessionalAction = async () => {
  try {
    const { data } = await axiosClient.get(
      "professional/business-by-professional"
    );

    const professionalBusiness: ProfessionalWithBusiness[] = data.data.map(
      (professionalBusiness: any) =>
        ProfessionalWithBusinessMapper.fromProfessionalWithBusinessDBtoProfessionalWithBusiness(
          professionalBusiness
        )
    );

    return {
      status: true,
      data: professionalBusiness,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
