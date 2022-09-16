import { NextApiRequest, NextApiResponse } from "next";
import RequestHandler from ".";
import UserService from "../services/UserService";
import OrderService from "../services/OrderService";
import { api_routes, routes } from "../routes";

export class OrderRequest extends RequestHandler {
  private userService: UserService;
  private orderService: OrderService;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
    this.userService = new UserService();
  }

  get() {}

  post() {
    // if (this.matches(routes.))
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
}
