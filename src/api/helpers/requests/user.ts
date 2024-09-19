import { routes } from "../../routes";
import { insertIdIntoUrl } from "../../utils/formatting";
import axios from "axios";
import {
  User,
  Product,
  Address,
  BasketItem,
  Currency,
  Country,
} from "../../entities";
import { BasketView } from "../../entities/BasketView";
import { getCountryById } from "./countries";

export async function getUserById(id: number): Promise<User> {
  const url = insertIdIntoUrl(routes.user.user, "user", id);
  const request = await axios(url, {
    method: "GET",
  });
  return request.data.user;
}

export async function getBasketByUserId(id: number): Promise<Product[]> {
  const url = insertIdIntoUrl(routes.user.basket, "user", id);
  const request = await axios(url, {
    method: "GET",
  });
  return request.data.basket;
}

export async function getBasketViewByUserId(id: number): Promise<BasketItem[]> {
  const url = insertIdIntoUrl(routes.user.get_full_basket, "user", id);
  const request = await axios(url, {
    method: "GET",
  });
  return request.data.basket;
}

export async function getAddressesByUserId(id: number): Promise<Address[]> {
  const url = insertIdIntoUrl(routes.user.addresses, "user", id);
  const request = await axios(url, {
    method: "GET",
  });
  return request.data.addresses;
}

export async function putUserCurrency(
  id: number,
  currency: Currency
): Promise<any> {
  const fieldQuery = { currency: currency };
  return await putUser(id, fieldQuery);
}

export async function putUserCountry(
  id: number,
  country: Country
): Promise<any> {
  const fieldQuery = { country: country };
  return await putUser(id, fieldQuery);
}

export async function putUserCountryByCountryId(
  id: number,
  countryId: number
): Promise<any> {
  // get country by country id

  const country = await getCountryById(countryId);
  const fieldQuery = { country: country };
  return await putUser(id, fieldQuery);
}

export async function putUser(id: number, fieldQuery: any): Promise<any> {
  const url = insertIdIntoUrl(routes.user.user, "user", id);
  const request = await axios(url, {
    method: "PUT",
    data: {
      fieldQuery: fieldQuery,
    },
  });
  return request;
}

export async function postUser(user: User): Promise<User | void> {
  const url = routes.user.add;
  const request = await axios(url, {
    method: "POST",
    data: {
      user: user,
    },
  });
  if (request.status === 201) {
    return request.data.user;
  }
  return request.data;
}
