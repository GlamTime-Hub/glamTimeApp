import axiosClient from "@/core/api/axios-client";
import { BusinessMapper } from "@/core/mappers/business.mapper";

export const newBusinessAction = async (business: any) => {
  try {
    const { data } = await axiosClient.post("business", business);

    console.log("data back", data);

    const newBusiness = BusinessMapper.fromTheBusinessDBToBusiness(data.data);

    console.log("newBusiness", newBusiness);

    return {
      status: true,
      data: newBusiness,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
