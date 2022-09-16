import { Service } from "typedi";
import { EntityTarget, In } from "typeorm";
import BaseService from "./BaseService";
import { Basket } from "../entities/Basket";
import { BasketItemType } from "../helpers/basket";
import { BasketItem } from "../entities/BasketItem";

@Service()
export default class BasketService extends BaseService {
  constructor() {
    super(Basket);
  }

  public async getBasketByUserId(id: number): Promise<Basket> {
    id = this.sanitizeId(id);
    const basket = await this.repository.findOneBy({
      user_id: id,
    });
    return basket;
  }

  public async addToBasket(
    user_id: number,
    items: BasketItemType[]
  ): Promise<void> {
    const basket = await this.getBasketByUserId(user_id);
    const date = new Date();
    let basketItems: BasketItem[] = [];
    for (const item of items) {
      const basketItem = new BasketItem();
      basketItem.basket_id = basket.basket_id;
      basketItem.date_added = date;
      basketItem.price = item.price;
      basketItem.product_id = item.product_id;
      basketItem.quantity = item.quantity;
      basketItems.push(basketItem);
    }
    await this.repository.save(basketItems);
    return;
  }
}
