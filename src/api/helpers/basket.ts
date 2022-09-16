import { NextFetchEvent } from "next/server";
import { api_routes } from "../routes";

export type BasketItemType = {
  product_id: number;
  quantity: number;
  price: number;
};

// export async function addToBasket(items: BasketItemType[]) {
//     const route = api_routes.basket.add_to_basket;
//     const request = await fetch(route, {
//         method: 'POST'
//     })
// }
