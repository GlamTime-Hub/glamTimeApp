import { getCitiesAction } from "@/core/actions/location/get-cities";
import { getCountriesAction } from "@/core/actions/location/get-countries";
import { useQuery } from "@tanstack/react-query";

export const useLocation = (countryId: string) => {
  const { data: countries, isLoading: loadingCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountriesAction,
    staleTime: 1000 * 60 * 60 * 24 * 7,
  });

  const { data: cities, isLoading: loadingCities } = useQuery({
    queryKey: ["cities", countryId],
    queryFn: () => getCitiesAction(countryId),
    enabled: !!countryId,
  });

  return {
    countries: countries?.data,
    loadingCountries,
    cities: cities?.data,
    loadingCities,
  };
};
