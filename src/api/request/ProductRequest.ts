import { NextApiRequest, NextApiResponse } from "next";
import RequestHandler from ".";
import { isInRoutes } from "../../pages/api/[...route]";
import { api_routes, routes } from "../routes";
import ProductService from "../services/ProductService";
import ReviewService from "../services/ReviewService";
import { getIdFromUrl } from "../utils/idFromUrl";

export class ProductRequest extends RequestHandler {
  private productService: ProductService;
  private reviewService: ReviewService;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
    this.productService = new ProductService();
    this.reviewService = new ReviewService();
  }

  get() {
    if (this.matches(routes.product.product)) {
      return this.getProduct();
    }
    if (this.matches(routes.product.all)) {
      return this.getAllProducts();
    }
    if (this.matches(routes.product.reviews)) {
      return this.getReviews();
    }
    if (this.matches(routes.product.search)) {
      return this.getProductBySearch();
    }
  }

  post() {
    if (this.matches(routes.product.post)) {
      return this.postProduct();
    }
  }

  put() {
    if (this.matches(routes.product.product)) {
      return this.putProduct();
    }
  }

  // Get methods

  async getProduct(): Promise<void> {
    const id = this.getIdFromPath("product");
    const product = await this.productService.getProductById(id);
    return this.sendResponseJSON({ product: product }, 200);
  }

  async getAllProducts(): Promise<void> {
    const products = await this.productService.getAllProducts();
    return this.sendResponseJSON({ products: products }, 200);
  }

  async getReviews(): Promise<void> {
    const id = this.getIdFromPath("product");
    const reviews = await this.reviewService.getReviewByProductId(id);
    return this.sendResponseJSON({ reviews: reviews }, 200);
  }

  async getProductBySearch(): Promise<void> {
    const { query, categories } = this.req.query;
    const products = await this.productService.getProductBySearch(query, categories);
    return this.sendResponseJSON({ products: products }, 200);
  }

  // Post methods

  async postProduct(): Promise<void> {
    const { product } = this.req.body;
    // sanitize product
    const newProduct = await this.productService.postProduct(product);
    if (!newProduct) {
      return this.sendResponseJSON({}, 404);
    }
    return this.sendResponseJSON({ product: newProduct }, 201);
  }

  // Put methods

  async putProduct(): Promise<void> {
    const id = this.getIdFromPath("user");
    const { fieldQuery } = this.req.body;
    const putRequest = await this.productService.putProductById(id, fieldQuery);
    if (!putRequest) {
      this.sendResponseJSON({}, 404);
    }
    return this.sendResponseJSON({}, 204);
  }

  // Delete methods
}
