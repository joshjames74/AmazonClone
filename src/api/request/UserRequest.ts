import { NextApiRequest, NextApiResponse } from "next";
import RequestHandler from ".";
import { api_routes, routes } from "../routes";
import BasketService from "../services/BasketService";
import CurrencyService from "../services/CurrencyService";
import OrderService from "../services/OrderService";
import ReviewService from "../services/ReviewService";
import UserService from "../services/UserService";

export class UserRequest extends RequestHandler {

    private userService: UserService;
    private orderService: OrderService;
    private basketService: BasketService;
    private currencyService: CurrencyService;
    private reviewService: ReviewService;

    constructor(req: NextApiRequest, res: NextApiResponse) {
        super(req, res);
        this.userService = new UserService();
        this.orderService = new OrderService();
        this.basketService = new BasketService();
        this.currencyService = new CurrencyService();
        this.reviewService = new ReviewService();
    };

    get() {
        if (this.matches(routes.user.user)) {
            return this.getUser();
        }
        if (this.matches(routes.user.orders)) {
            return this.getOrders();
        }
        if (this.matches(routes.user.basket)) {
            return this.getBasket();
        }
        if (this.matches(routes.user.currency)) {
            return this.getCurrency();
        }
    }

    post() {
        if (this.matches(routes.user.add)) {
            return this.postUser();
        }
        if (this.matches(routes.user.add_review)) {
            return this.postReview();
        }
    }

    put() {
        if (this.matches(routes.user.user)) {
            return this.putUser();
        }
    }

    // Get functions

    async getUser(): Promise<void> {
        const id = this.getIdFromPath('user');
        const user = await this.userService.getUserById(id);
        return this.sendResponseJSON({user: user}, 200);
    };

    async getOrders(): Promise<void> {
        const id = this.getIdFromPath('user');
        const orders = await this.orderService.getOrdersByUserId(id);
        return this.sendResponseJSON({orders: orders}, 200);
    }

    async getBasket(): Promise<void> {
        const id = this.getIdFromPath('user');
        const basket = await this.basketService.getBasketByUserId(id);
        return this.sendResponseJSON({basket: basket}, 200);
    }

    async getCurrency(): Promise<void> {
        const id = this.getIdFromPath('user');
        const user = await this.userService.getUserById(id);
        return this.sendResponseJSON({currency: user.currency}, 200);
    }

    // Post functions

    async postUser(): Promise<void> {
        const { user } = this.req.body;
        // sanitize user
        const newUser = await this.userService.postUser(user);
        if (!newUser) {
            return this.sendResponseJSON({}, 404);
        }
        return this.sendResponseJSON({user: newUser}, 201);
    }

    async postOrder(): Promise<void> {
        const { order } = this.req.body;
        // sanitize order
        const newOrder = await this.orderService.postOrder(order);
        if (!newOrder) {
            return this.sendResponseJSON({}, 404);
        }
        return this.sendResponseJSON({order: newOrder}, 201);
    }

    async postReview(): Promise<void> {
        const id = this.getIdFromPath('user');
        console.log(this.req);
        const { review } = this.req.body;
        const request = await this.reviewService.postReview(review);
        return this.sendResponseJSON({review: request}, 201);
    }

    // Put functions

    async putUser(): Promise<void> {
        const id = this.getIdFromPath('user');
        const { fieldQuery } = this.req.body;
        const putRequest = await this.userService.putUser(id, fieldQuery);
        if (!putRequest) {
            return this.sendResponseJSON({}, 404);
        }
        return this.sendResponseJSON({}, 204);
    }
}