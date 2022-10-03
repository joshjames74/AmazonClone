import { Service } from "typedi";
import BaseService from "./BaseService";
import { BasketItem } from "../entities/BasketItem";
import { Basket, Product } from "../entities";
import { In } from "typeorm";

@Service()
export default class BasketItemService extends BaseService {
  constructor() {
    super(BasketItem);
  }

  public async getBasketItemByBasketId(id: number): Promise<BasketItem[]> {
    id = this.sanitizeId(id);
    const basketItems = await this.repository.findBy({
      basket: {
        basket_id: id,
      },
    });
    return basketItems;
  }

  public async getBasketItemByItemId(id: number): Promise<BasketItem> {
    id = this.sanitizeId(id);
    const query = await this.repository.findOneBy({
      item_id: id,
    });
    return query;
  }

  public async getBasketItemByBasketIds(id: number): Promise<BasketItem[]> {
    id = this.sanitizeId(id);
    const baskets = await this.repository.findBy({
      basket: {
        basket_id: id,
      },
    });
    return baskets;
  }

  public async isInBasket(
    basket: Basket,
    product: Product
  ): Promise<BasketItem> {
    const query = await this.repository.findOneBy({
      basket: {
        basket_id: basket?.basket_id,
      },
      product: {
        product_id: product?.product_id,
      },
    });
    if (query) {
      return query;
    }
    return;
  }

  public async postBasketItem(
    basket: Basket,
    basketItem: Partial<BasketItem>
  ): Promise<void> {
    basketItem.basket = basket;
    // If in basket, update quantity
    const isInBasket = await this.isInBasket(basket, basketItem.product);
    if (isInBasket) {
      return this.putBasketItemQuantity(isInBasket, basketItem.quantity);
    }
    return await this.repository.save(basketItem);
  }

  public async putBasketItemQuantity(
    basketItem: Partial<BasketItem>,
    quantity: number
  ): Promise<any> {
    const existing = await this.getBasketItemByItemId(basketItem.item_id);
    const newQuantity = Number(existing.quantity) + Number(quantity);
    const query = await this.repository
      .createQueryBuilder()
      .update(BasketItem)
      .set({ quantity: newQuantity })
      .where({ item_id: basketItem.item_id })
      .execute();
    return query;
  }

  public async deleteBasketItem(item_id: number): Promise<any> {
    const query = await this.repository
      .createQueryBuilder()
      .delete()
      .from(BasketItem)
      .where({ item_id: item_id })
      .execute();
    return query;
  }

  public async deleteBasketItemByBasketId(basket_id: number): Promise<any> {
    const query = await this.repository
      .createQueryBuilder()
      .delete()
      .from(BasketItem)
      .where({ basket: {basket_id: basket_id} })
      .execute();
    return query;
  }
}
