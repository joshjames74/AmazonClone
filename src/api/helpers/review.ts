import { In, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Product } from "../entities/Product";
import { Review } from "../entities/Review";
import { getProductById } from "./product";
import { sanitizeId } from "../sanitation/id";

function getRepository(): Repository<Review> {
    return AppDataSource.getRepository(Review);
}

export async function getReviewById(id: number): Promise<Review> {
    id = sanitizeId(id);
    const repository = getRepository();
    const review = await repository.findOneBy({
        review_id: id
    });
    return review;
};

export async function getReviewsByProductId(id: number): Promise<Review[]> {
    id = sanitizeId(id);
    const repository = getRepository();
    const reviews = await repository.findBy({
        product_id: id
    });
    return reviews;
};

export async function postReview(review: Review): Promise<number> {
    const repository = getRepository();
    await repository.save(review);
    return review.review_id;
};