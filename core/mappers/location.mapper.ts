import { City } from "../interfaces/city.interface";
import { Country } from "../interfaces/country.interface";

export class LocationMapper {
  static fromCountryDBToCountry = (countries: any[]): Country[] => {
    return countries.map(
      (country: any) => ({ id: country._id, name: country.name } as Country)
    );
  };

  static fromCityDBToCity = (cities: any[]): City[] => {
    return cities.map(
      (country: any) => ({ id: country._id, name: country.name } as City)
    );
  };
}
