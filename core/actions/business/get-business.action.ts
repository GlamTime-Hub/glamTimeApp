import axiosClient from "@/core/api/axios-client";
import { BusinessMapper } from "@/core/mappers/business.mapper";

export const getBusinessAction = async () => {
  try {
    const { data } = await axiosClient.get("business/get-business-by-user-id");

    const business = data.data.map((business: any) =>
      BusinessMapper.fromTheBusinessDBToBusiness(business)
    );

    return {
      status: true,
      data: business,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
