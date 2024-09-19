import { Service } from "typedi";
import { Order } from "../entities/Order";
import { In } from "typeorm";
import BaseService from "./BaseService";
import { OrderItem } from "../entities";
import { Repository } from "typeorm";
import ProductService from "./ProductService";

@Service()
export default class OrderItemService extends BaseService {
  constructor() {
    super(OrderItem);
  }

  public async getOrderItemById(id: number): Promise<Order[]> {
    id = this.sanitizeId(id);
    const order = await this.repository.findBy({
      order: { order_id: id },
    });
    return order;
  }

  public async getOrderItemsByIds(ids: number[]): Promise<Order[]> {
    ids = ids.map((id) => this.sanitizeId(id));
    const orders = await this.repository.findBy({
      order_item_id: In(ids),
    });
    return orders;
  }

  public async getOrderItemsByProductId(id: number): Promise<Order[]> {
    id = this.sanitizeId(id);
    const orders = await this.repository.findBy({
      where: {
        product: {
          product_id: id,
        },
      },
    });
    return orders;
  }

  public async postOrderItem(orderItem: OrderItem): Promise<number> {
    await this.repository.save(orderItem);
    return orderItem.order_item_id;
  }

  public async postOrderItems(orderItems: OrderItem[]): Promise<void> {
    for (const orderItem of orderItems) {
      await this.repository.save(orderItem);
    }
    return;
  }
}
