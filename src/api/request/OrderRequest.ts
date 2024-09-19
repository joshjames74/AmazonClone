import { NextApiRequest, NextApiResponse } from "next";
import RequestHandler from ".";
import UserService from "../services/UserService";
import OrderService from "../services/OrderService";
import { routes } from "../routes";
import OrderItemService from "../services/OrderItemService";
import ProductService from "../services/ProductService";

export class OrderRequest extends RequestHandler {
  private userService: UserService;
  private orderService: OrderService;
  private orderItemService: OrderItemService;
  private productService: ProductService;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
    this.userService = new UserService();
    this.productService = new ProductService();
    this.orderService = new OrderService();
    this.orderItemService = new OrderItemService();
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
    let orderViews = [];
    for (const order of orders) {
      const orderView = { order: order, orderItems: null };
      orderView.orderItems = await this.orderItemService.getOrderItemById(
        order.order_id
      );
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

    // await this.productService.putProductOrderCountByOrderItem(orderItems);

    try {
      // save order
      await this.orderService.postOrder(order);
      queryRunner.commitTransaction();

      // save order items
      await this.orderItemService.postOrderItems(orderItems);
      queryRunner.commitTransaction()

      // update order_count for each item
      await this.productService.putProductOrderCountByOrderItem(orderItems);
      queryRunner.commitTransaction();

      statusCode = 201;
      return this.sendResponseJSON({ }, 201);

    } catch (error) {
      queryRunner.rollbackTransaction();
      let message = error;
      statusCode = 404;

      return this.sendResponseJSON({ }, 400)
      
    };
  }
}
