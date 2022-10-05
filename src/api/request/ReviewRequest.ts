import { NextApiRequest, NextApiResponse } from "next";
import RequestHandler from ".";
import { api_routes, routes } from "../routes";
import ReviewService from "../services/ReviewService";
import { Review } from "../entities";
import ProductService from "../services/ProductService";

/**
 * @depreciated Use user request instead
 */
export class ReviewRequest extends RequestHandler {
  private reviewService: ReviewService;
  private productService: ProductService;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
    this.reviewService = new ReviewService();
    this.productService = new ProductService();
  }

  post() {
    if (this.matches(routes.user.add_review)) {
      return this.postReview();
    }
  }

  async getReviews(): Promise<void> {
    const id = this.getIdFromPath("user");
    const reviews = await this.reviewService.getReviewByUserId(id);
    return this.sendResponseJSON({ reviews: reviews }, 200);
  }

  async postReview(): Promise<Review> {
    const id = this.getIdFromPath("user");
    const { review } = this.req.body;
    const request = await this.reviewService.postReview(review);
    const updateReview = await this.productService.putProductReviewById(review.product.product_id, review.review_score);
    return request;
  }
}
