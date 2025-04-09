import axiosClient from "@/core/api/axios-client";
import { Region } from "@/core/interfaces/region.interface";

export const updateLocationAction = async (id: string, location: Region) => {
  try {
    await axiosClient.put("business/update-location/" + id, location);

    return {
      status: true,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
