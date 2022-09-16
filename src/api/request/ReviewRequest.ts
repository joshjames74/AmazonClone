import { NextApiRequest, NextApiResponse } from "next";
import RequestHandler from ".";
// import { isInRoutes } from "../../pages/api/[route]";
import { api_routes, routes } from "../routes";
import ReviewService from "../services/ReviewService";
import { Review } from "../entities";


/**
 * @depreciated Use user request instead
 */
export class ReviewRequest extends RequestHandler {

    private reviewService: ReviewService;

    constructor(req: NextApiRequest, res: NextApiResponse) {
        super(req, res);
        this.reviewService = new ReviewService();
    };

    get() {
        // if (this.matches(api_routes.product.reviews)) {
        //     return this.getReviews();
        // }
    }
    
    post() {
        if (this.matches(routes.user.add_review)) {
            return this.postReview();
        }
    }

    async getReviews(): Promise<void> {
        const id = this.getIdFromPath('user');
        const reviews = await this.reviewService.getReviewByUserId(id);
        return this.sendResponseJSON({reviews: reviews}, 200);
    };

    async postReview(): Promise<Review> {
        const id = this.getIdFromPath('user');
        console.log(this.req);
        const { review } = this.req.body;
        const request = await this.reviewService.postReview(review);
        return request; 
    }


}