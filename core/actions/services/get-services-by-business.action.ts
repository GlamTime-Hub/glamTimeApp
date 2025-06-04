import axiosClient from "@/core/api/axios-client";
import { Service } from "@/core/interfaces/service.interface";
import { ServiceMapper } from "@/core/mappers/service.mapper";

export const getServicesByBusinessAction = async (
  businessId: string,
  filterByBusiness: boolean,
  businessType: string
) => {
  try {
    const { data } = await axiosClient.post(
      "services/get-services-by-business",
      {
        businessId,
        filterByBusiness,
        businessType,
      }
    );

    const service: Service[] = data.data.map((service: any) =>
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
