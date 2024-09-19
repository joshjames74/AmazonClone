import { Service } from "typedi";
import { Order } from "../entities/Order";
import { In } from "typeorm";
import BaseService from "./BaseService";
import { OrderView } from "../entities/OrderView";
import { Repository } from "typeorm";

@Service()
export default class OrderService extends BaseService {
  constructor() {
    super(Order);
  }

  public async getOrderById(id: number): Promise<OrderView> {
    id = this.sanitizeId(id);
    const order = await this.repository.manager.findOneBy(OrderView, {
      user: { user_id: id },
    });
    return order;
  }

  public async getOrdersByIds(ids: number[]): Promise<Order[]> {
    ids = ids.map((id) => this.sanitizeId(id));
    const orders = await this.repository.findBy({
      order_id: In(ids),
    });
    return orders;
  }

  public async getOrdersByUserId(id: number): Promise<Order[]> {
    id = this.sanitizeId(id);
    const orders = await this.repository.findBy({
      user: { user_id: id },
    });
    return orders;
  }

  public async getOrderViewByUserId(id: number): Promise<any> {
    id = this.sanitizeId(id);
    const orderViews = await this.repository.manager
      .createQueryBuilder()
      .select("*")
      .from(OrderView)
      .where({ user_id: id })
      .execute();
    return orderViews;
  }

  public async postOrder(
    order: Order,
    repository: Repository<any> = this.repository
  ): Promise<Order> {
    await repository.save(order);
    return order;
  }
}
