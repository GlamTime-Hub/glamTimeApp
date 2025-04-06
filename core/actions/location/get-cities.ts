import axiosClient from "@/core/api/axios-client";
import { LocationMapper } from "@/core/mappers/location.mapper";

export const getCitiesAction = async (countryId: string) => {
  try {
    const {
      data: { data },
    } = await axiosClient.get("location/city-by-country/" + countryId);

    const cities = LocationMapper.fromCityDBToCity(data);

    return {
      status: true,
      data: cities,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
