import { NextApiRequest, NextApiResponse } from "next";
import RequestHandler from ".";
import UserService from "../services/UserService";
import OrderService from "../services/OrderService";
import { api_routes, routes } from "../routes";
import OrderItemService from "../services/OrderItemService";
import { Order, OrderItem } from "../entities";

export class OrderRequest extends RequestHandler {
  private userService: UserService;
  private orderService: OrderService;
  private orderItemService: OrderItemService;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
    this.userService = new UserService();
  }

  get() {
    // if (this.matches(routes.user.all_orders)) {
    //   // return this.getUserOrdersViews();
    //   return this.getUserOrders();
    // }
  }

  post() {
    if (this.matches(routes.user.get_order)) {
      return this.getOrder();
    }
    if (this.matches(routes.user.add_order)) {
      return this.postOrder();
    }
  }

  async getUserOrdersViews(): Promise<void> {
    const id = this.getIdFromPath("user");
    const orders = await this.orderService.getOrderViewByUserId(id);
    return this.sendResponseJSON({ orders: orders }, 200);
  }

  async getUserOrders(): Promise<void> {
    const id = this.getIdFromPath("order");
    const orders = await this.orderService.getOrdersByUserId(id);
    return this.sendResponseJSON({ orders: orders }, 200);
  }

  async getOrder(): Promise<void> {
    const id = this.getIdFromPath("user");
    const orders = await this.orderService.getOrdersByUserId(id);
    let orderViews = []
    for (const order of orders) {
      const orderView = {order: order, orderItems: null}
      orderView.orderItems = await this.orderItemService.getOrderItemById(order.order_id);
      orderViews.push(orderView);
    }
    return this.sendResponseJSON({ order: orderViews }, 200);
  }

  async postOrder(): Promise<void> {
    const id = this.getIdFromPath("user");
    const { order, orderItems } = this.req.body;
    const queryRunner = await this.createTransaction();

    let message: string;
    let statusCode: number;
    try {
      await this.orderService.postOrder(
        order,
        queryRunner.getRepository(Order)
      );
      queryRunner.commitTransaction();
      await this.orderItemService.postOrderItems(
        orderItems,
        queryRunner.getRepository(OrderItem)
      );
      queryRunner.commitTransaction();
      statusCode = 201;
    } catch (error) {
      queryRunner.rollbackTransaction();
      message = error;
      statusCode = 404;
    } finally {
      queryRunner.release();
      return this.sendResponseJSON({ message: message }, statusCode);
    }
  }
}
