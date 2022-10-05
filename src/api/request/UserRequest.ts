import { NextApiRequest, NextApiResponse } from "next";
import RequestHandler from ".";
import { api_routes, routes } from "../routes";
import BasketService from "../services/BasketService";
import BasketItemService from "../services/BasketItemService";
import CurrencyService from "../services/CurrencyService";
import OrderService from "../services/OrderService";
import ReviewService from "../services/ReviewService";
import UserService from "../services/UserService";
import { Review, User, Product, Order, OrderItem } from "../entities";
import AddressService from "../services/AddressService";
import OrderItemService from "../services/OrderItemService";
import ProductService from "../services/ProductService";

export class UserRequest extends RequestHandler {
  private userService: UserService;
  private orderService: OrderService;
  private basketService: BasketService;
  private basketItemService: BasketItemService;
  private currencyService: CurrencyService;
  private reviewService: ReviewService;
  private addressService: AddressService;
  private orderItemService: OrderItemService;
  private productService: ProductService;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
    this.userService = new UserService();
    this.orderService = new OrderService();
    this.basketService = new BasketService();
    this.basketItemService = new BasketItemService();
    this.currencyService = new CurrencyService();
    this.reviewService = new ReviewService();
    this.addressService = new AddressService();
    this.orderItemService = new OrderItemService();
    this.productService = new ProductService();
  }

  get() {
    if (this.matches(routes.user.user)) {
      return this.getUser();
    }
    if (this.matches(routes.user.get_all_orders)) {
      return this.getOrders();
    }
    if (this.matches(routes.user.basket)) {
      return this.getBasket();
    }
    if (this.matches(routes.user.get_full_basket)) {
      return this.getFullBasket();
    }
    if (this.matches(routes.user.currency)) {
      return this.getCurrency();
    }

    if (this.matches(routes.user.addresses)) {
      return this.getAddresses();
    }
  }

  post() {
    if (this.matches(routes.user.add)) {
      return this.postUser();
    }
    if (this.matches(routes.user.add_review)) {
      return this.postReview();
    }
    if (this.matches(routes.user.add_to_basket)) {
      return this.postBasketItem();
    }
    if (this.matches(routes.user.add_order)) {
      return this.postOrder();
    }
  }

  put() {
    if (this.matches(routes.user.user)) {
      return this.putUser();
    }
  }

  delete() {
    if (this.matches(routes.user.delete_review)) {
      return this.deleteReview();
    }
    if (this.matches(routes.user.delete_basket_item)) {
      return this.deleteBasketItem();
    }
    if (this.matches(routes.user.empty_basket)) {
      return this.emptyBasket();
    }
  }

  // Get functions

  async getUser(): Promise<void> {
    const id = this.getIdFromPath("user");
    const user = await this.userService.getUserById(id);
    return this.sendResponseJSON({ user: user }, 200);
  }

  async getOrders(): Promise<void> {
    const id = this.getIdFromPath("user");
    const orders = await this.orderService.getOrdersByUserId(id);
    console.log(typeof orders);
    let orderViews = []
    for (const order of orders) {
      const orderView = {order: order, orderItems: null}
      orderView.orderItems = await this.orderItemService.getOrderItemById(order.order_id);
      orderViews.push(orderView);
    }
    return this.sendResponseJSON({ order: orderViews }, 200);
  }

  async getBasket(): Promise<void> {
    const id = this.getIdFromPath("user");
    const basket = await this.basketService.getBasketByUserId(id);
    return this.sendResponseJSON({ basket: basket }, 200);
  }

  async getFullBasket(): Promise<void> {
    const id = this.getIdFromPath("user");
    const basket = await this.basketService.getBasketByUserId(id);
    const basketItems = await this.basketItemService.getBasketItemByBasketIds(
      basket.basket_id
    );
    return this.sendResponseJSON({ basket: basketItems }, 200);
  }

  async getCurrency(): Promise<void> {
    const id = this.getIdFromPath("user");
    const user = await this.userService.getUserById(id);
    return this.sendResponseJSON({ currency: user.currency }, 200);
  }

  async getAddresses(): Promise<void> {
    const id = this.getIdFromPath("user");
    const addresses = await this.addressService.getAddressesByUserId(id);
    return this.sendResponseJSON({ addresses: addresses }, 200);
  }

  // Post functions

  async postUser(): Promise<void> {
    const { user } = this.req.body;
    const dataSource = await this.createTransaction();

    let userResponse: User;

    try {
      // save user to database
      userResponse = await dataSource.manager.getRepository(User).save(user);
      // get basket repository
      const basketRepository = dataSource.manager.getRepository(Product);
      // create new basket for user
      await this.basketService.postBasket(
        userResponse.user_id,
        user,
        basketRepository
      );
    } catch (err) {
      await dataSource.rollbackTransaction();
    } finally {
      await dataSource.release();
    }

    if (userResponse) {
      return this.sendResponseJSON({ user: userResponse }, 201);
    }
    if (!userResponse) {
      return this.sendResponseJSON({}, 404);
    }
  }

  async postReview(): Promise<void> {
    const id = this.getIdFromPath("user");
    const { review } = this.req.body;
    const request = await this.reviewService.postReview(review);
    const updateReview = await this.productService.putProductReviewById(review.product.product_id, request.score);
    return this.sendResponseJSON({ review: request }, 201);
  }

  async postBasketItem(): Promise<void> {
    const id = this.getIdFromPath("user");
    console.log(id);
    let basket = await this.basketService.getBasketByUserId(id);
    const { basketItem } = this.req.body;
    const request = await this.basketItemService.postBasketItem(
      basket,
      basketItem
    );
    return this.sendResponseJSON({ basket: request }, 201);
  }

  async postOrder(): Promise<void> {
    const { order, orderItems } = this.req.body;
    const queryRunner = await this.createTransaction();

    try {
      const orderObj = await this.orderService.postOrder(order);
      await queryRunner.commitTransaction();
      const newOrderItems = orderItems.map((orderItem: OrderItem) => {
        orderItem.order = orderObj;
        return orderItem;
      });
      await this.orderItemService.postOrderItems(newOrderItems);
    } catch (error) {
      await queryRunner.rollbackTransaction();
    }
    await queryRunner.release();
    return this.sendResponseJSON({}, 201);
  }

  // Put functions

  async putUser(): Promise<void> {
    const id = this.getIdFromPath("user");
    const { fieldQuery } = this.req.body;
    const putRequest = await this.userService.putUser(id, fieldQuery);
    if (!putRequest) {
      return this.sendResponseJSON({}, 404);
    }
    return this.sendResponseJSON({}, 204);
  }

  // Delete methods

  async deleteReview(): Promise<any> {
    const id = this.getIdFromPath("user");
    const { review } = this.req.body;
    const updateReview = await this.productService.putProductReviewById(review.product.product_id, review.score, true);
    await this.reviewService.deleteReview(review.review_id);
    return this.sendResponseJSON({}, 204);
  }

  async deleteBasketItem(): Promise<any> {
    const itemId = this.getIdFromPath("item");
    await this.basketItemService.deleteBasketItem(itemId);
    return this.sendResponseJSON({}, 202);
  }

  async emptyBasket(): Promise<any> {
    const id = this.getIdFromPath("user");
    const basket = await this.basketService.getBasketByUserId(id);
    await this.basketItemService.deleteBasketItemByBasketId(basket.basket_id);
    return this.sendResponseJSON({}, 202);
  }
}
