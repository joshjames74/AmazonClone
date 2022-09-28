import { NextApiRequest, NextApiResponse } from "next";
import RequestHandler from ".";
import UserService from "../services/UserService";
import OrderService from "../services/OrderService";
import { api_routes, routes } from "../routes";
import OrderItemService from "../services/OrderItemService";

export class OrderRequest extends RequestHandler {
  private userService: UserService;
  private orderService: OrderService;
  private orderItemService: OrderItemService;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
    this.userService = new UserService();
  }

  get() {}

  post() {
    if (this.matches(routes.user.get_order)) {
      return this.getOrder();
    }
  }

  async getUserOrders(): Promise<void> {
    const id = this.getIdFromPath("order");
    const orders = await this.orderService.getOrdersByUserId(id);
    return this.sendResponseJSON({ orders: orders }, 200);
  }

  async getOrder(): Promise<void> {
    const id = this.getIdFromPath("order");
    const order = await this.orderService.getOrderById(id);
    return this.sendResponseJSON({ order: order }, 200);
  }

  async postOrder(): Promise<void> {
    const id = this.getIdFromPath("user");
    const { order, orderItems } = this.req.body;
    const queryRunner = await this.createTransaction();
    await this.orderService.postOrder(order);
    await this.orderItemService.postOrderItems(orderItems);

    let message: string;
    let statusCode: number;
    try {
      queryRunner.commitTransaction();
      statusCode = 201;
    } catch (error) {
      queryRunner.rollbackTransaction();
      message = error;
      statusCode = 404;
    } finally {
      queryRunner.release()
      return this.sendResponseJSON({message: message}, statusCode);
    }
  }
}
