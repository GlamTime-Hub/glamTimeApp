import axiosClient from "@/core/api/axios-client";
import { ServiceMapper } from "@/core/mappers/service.mapper";

export const getServicesByBusinessAction = async (
  businessId: string,
  filterByBusiness: boolean
) => {
  try {
    const { data } = await axiosClient.post(
      "services/get-services-by-business",
      {
        businessId,
        filterByBusiness,
      }
    );

    const service = data.data.map((service: any) =>
      ServiceMapper.fromServiceDBToService(service)
    );

    return {
      status: true,
      data: service,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
