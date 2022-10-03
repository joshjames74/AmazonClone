import { Order, OrderItem } from "../../entities";
import { routes } from "../../routes";
import { insertIdIntoUrl } from "../../utils/formatting";
import axios from "axios";
import { OrderView } from "../../entities/OrderView";

export async function getOrderViewByUserId(id: number): Promise<{order: Order, orderItems: OrderItem[]}[]> {
  const route = insertIdIntoUrl(routes.user.all_orders, "user", id);
  const request = await axios(route, {
    method: "GET",
  });
  return request.data.order;
}

export async function postOrder(
  order: Order,
  orderItems: OrderItem[]
): Promise<any> {
  const route = insertIdIntoUrl(
    routes.user.add_order,
    "user",
    order.user.user_id
  );
  const request = await axios(route, {
    method: "POST",
    data: {
      order: order,
      orderItems: orderItems,
    },
  });
  return request;
}
