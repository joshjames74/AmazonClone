import { ReviewType } from "../../../../types/Review";
import { Review } from "../../../../data-source";
import { postReview } from "../../../../api/helpers/review";

export function convertToReview(review: ReviewType, user_id: number, product_id: number): Review {

    const reviewORM = new Review();
    reviewORM.content = review.content;
    reviewORM.product_id = product_id;
    reviewORM.user_id = user_id;
    reviewORM.score = review.score;
    // need to change this
    reviewORM.image_urls = review.images[0];
    reviewORM.date = new Date();

    return reviewORM;
}

export async function saveReview(review: Review): Promise<void> {
    await postReview(review);
}

export async function addReview(review: ReviewType, user_id: number, product_id: number): Promise<void> {
    const reviewToAdd = convertToReview(review, user_id, product_id);
    saveReview(reviewToAdd);
}