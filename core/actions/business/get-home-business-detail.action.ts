import axiosClient from "@/core/api/axios-client";
import { Business } from "@/core/interfaces/business.interface";
import { BusinessMapper } from "@/core/mappers/business.mapper";

export const getHomeBusinessDetailAction = async (id: string) => {
  try {
    const { data } = await axiosClient.get(
      "business/get-home-business-detail/" + id
    );

    const business: Business = BusinessMapper.fromTheBusinessDBToBusiness(
      data.data[0]
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
