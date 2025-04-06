import axiosClient from "@/core/api/axios-client";
import { LocationMapper } from "@/core/mappers/location.mapper";

export const getCountriesAction = async () => {
  try {
    console.log(" getUserAction");

    const {
      data: { data },
    } = await axiosClient.get("location/countries");

    const countries = LocationMapper.fromCountryDBToCountry(data);

    return {
      status: true,
      data: countries,
    };
  } catch (error) {
    throw new Error(
      "Ha ocurrido un error inesperado.\npor favor contacte con soporte"
    );
  }
};
