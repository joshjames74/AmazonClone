import { DataSource, ViewColumn, ViewEntity } from "typeorm";
import { Address, Currency, Order, OrderItem, Product, User } from ".";

@ViewEntity({
  expression: (dataSource: DataSource) =>
    dataSource
      .createQueryBuilder()
      .select("*")
      .from(OrderItem, "orderItem")
      .leftJoin(Order, "order", "order.order_id = orderItem.order.order_id"),
})
export class OrderView {
  @ViewColumn()
  orderItem: OrderItem;

  @ViewColumn()
  order: Order;
}
