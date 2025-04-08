import axiosClient from "@/core/api/axios-client";
import { BusinessMapper } from "@/core/mappers/business.mapper";

export const updateBusinessAction = async (business: any) => {
  try {
    const { data } = await axiosClient.put("business/" + business.id, business);
    const response = BusinessMapper.fromTheBusinessDBToBusiness(data.data);
    return {
      status: true,
      data: response,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
