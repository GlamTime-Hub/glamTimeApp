import axiosClient from "@/core/api/axios-client";
import { Business } from "@/core/interfaces/business.interface";
import { BusinessMapper } from "@/core/mappers/business.mapper";

export const getBusinessFavoritesAction = async () => {
  try {
    const { data } = await axiosClient.get("business/get-favorites");

    const business: Business[] = data.data.map((business: any) =>
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
