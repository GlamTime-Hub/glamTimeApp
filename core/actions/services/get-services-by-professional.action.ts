import axiosClient from "@/core/api/axios-client";
import { ProfessionalService } from "@/core/interfaces/professional-service.interface";
import { ProfessionalServiceMapper } from "@/core/mappers/professional-service.mapper";

export const getServicesByProfessionalAction = async (
  businessId: string,
  professionalId: string,
  userAuthId: string
) => {
  try {
    const { data } = await axiosClient.post(
      "services/services-by-professional-and-business",
      {
        businessId,
        professionalId,
        userAuthId,
      }
    );

    const services: ProfessionalService[] =
      data && data.data && data.data.length
        ? data.data.map((service: any) =>
            ProfessionalServiceMapper.fromProfessionalServideDBToProfessionalService(
              service
            )
          )
        : [];

    return {
      status: true,
      data: services,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
