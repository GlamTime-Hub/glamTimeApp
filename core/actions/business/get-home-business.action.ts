import axiosClient from "@/core/api/axios-client";
import { Business } from "@/core/interfaces/business.interface";
import { BusinessMapper } from "@/core/mappers/business.mapper";

export const getHomeBusinessAction = async (filter: any) => {
  try {
    const { data } = await axiosClient.post("business/get-home-business", {
      filter,
    });

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
