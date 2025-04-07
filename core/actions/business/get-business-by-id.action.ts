import axiosClient from "@/core/api/axios-client";
import { BusinessMapper } from "@/core/mappers/business.mapper";

export const getBusinessByIdAction = async (id: string) => {
  try {
    const { data } = await axiosClient.get("business/get-business-by-id/" + id);

    console.log("data edit", data);

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
