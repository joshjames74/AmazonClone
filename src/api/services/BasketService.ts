import { Service } from "typedi";
import { EntityTarget, In, Repository } from "typeorm";
import BaseService from "./BaseService";
import { Basket } from "../entities/Basket";
import { BasketItemType } from "../helpers/basket";
import { BasketItem } from "../entities/BasketItem";
import { getUserById } from "../helpers/user";
import { BasketView } from "../entities/BasketView";

@Service()
export default class BasketService extends BaseService {
  constructor() {
    super(Basket);
  }

  public async getBasketByUserId(id: number): Promise<Basket> {
    id = this.sanitizeId(id);
    const basket = await this.repository.findOneBy({
      user: {
        user_id: id
      },
    });
    return basket;
  }

  public async getBasketViewByUserId(id: number): Promise<BasketView[]> {
    id = this.sanitizeId(id);
    const basket = await this.repository.manager.findBy( 
      BasketView, { basket: { user: {user_id: id}}}
    );
    return basket;
  }

  public async postBasket(
    id: number,
    repository: Repository<any> = this.repository
  ): Promise<Basket> {
    id = this.sanitizeId(id);
    let basket = await this.getBasketByUserId(id);
    if (basket.basket_id) {
      return basket
    }
    const user = await getUserById(id);
    basket = new Basket();
    basket.user = user;
    return await repository.save(basket);
  }
}
