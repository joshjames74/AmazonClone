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
import { getCountryById } from "./countries";
import { UserProfile } from "@auth0/nextjs-auth0/client";


export function createUserObjectFromProfile(profile: UserProfile): User {
  let user = new User();
  user.first_name = profile.name ? profile.name : ""
  user.image_url = profile.picture ? profile.picture : ""
  user.sub = profile.sub ? profile.sub : ""
  user.user_name = ""
  user.country = new Country()
  user.currency = new Currency()
  user.title = ""
  return user;
}


export async function getUserById(id: number): Promise<User> {
  const url = insertIdIntoUrl(routes.user.user, "user", id);
  const request = await axios(url, {
    method: "GET",
  });
  return request.data.user;
}


export async function getUserBySub(sub: string): Promise<User> {
  const request = await axios(routes.user.sub, {
    method: "GET",
    data: {
      sub: sub
    }
  })
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

export async function postNewUser(profile: UserProfile): Promise<User> {
  const url = routes.user.add;
  const user = createUserObjectFromProfile(profile);
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