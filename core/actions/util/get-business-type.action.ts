import axiosClient from "@/core/api/axios-client";
import { BusinessTypeMapper } from "@/core/mappers/business-type.mapper";

export const getBusinessTypeAction = async () => {
  try {
    const { data } = await axiosClient.get("util/business-types");

    const businessTypes = data.data.map((businessType: any) =>
      BusinessTypeMapper.fromBusinessTypeDBtoBusinessType(businessType)
    );

    return {
      status: true,
      data: businessTypes,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
