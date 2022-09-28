import { routes } from "../../routes";
import { insertIdIntoUrl } from "../../utils/formatting";
import axios from "axios";
import { User, Product, Address, BasketItem } from "../../entities";
import { BasketView } from "../../entities/BasketView";

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

export async function postUser(user: User): Promise<User | void> {
  const url = routes.user.add;
  console.log(user);
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
