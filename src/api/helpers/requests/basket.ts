import { BasketItem, Product, User } from "../../entities";
import { routes } from "../../routes";
import axios from "axios";
import { insertIdIntoUrl } from "../../utils/formatting";

export async function addToBasket(
  userId: number,
  basketItem: Partial<BasketItem>
): Promise<any> {
  const route = insertIdIntoUrl(routes.user.add_to_basket, "user", userId);
  const request = await axios(route, {
    method: "POST",
    data: {
      basketItem: basketItem,
    },
  });
  return request;
}

export async function deleteBasketItem(
  userId: number,
  itemId: number
): Promise<any> {
  let route = insertIdIntoUrl(routes.user.delete_basket_item, "user", userId);
  route = insertIdIntoUrl(route, "item", itemId);
  const request = await axios(route, {
    method: "DELETE",
  });
  return request;
}

export async function emptyBasket(
  userId: number
): Promise<any> {
  const route = insertIdIntoUrl(routes.user.empty_basket, "user", userId);
  const request = await axios(route, {
    method: "DELETE",
  });
  return request;
}
