import { routes } from "../../routes";
import axios from "axios";
import { Country } from "../../entities";

export async function getAllCountries(): Promise<Country[]> {
  const route = routes.country.all;
  const request = await axios(route, {
    method: "GET",
  });
  return request.data.countries;
}

export async function getCountryById(id): Promise<Country> {
  const route = routes.country.id;
  const request = await axios(route, {
    method: "GET",
    params: {
      id: id,
    },
  });
  return request.data.country;
}
