import { Service } from "typedi";
import { EntityTarget, In } from "typeorm";
import BaseService from "./BaseService";
import { Review } from "../entities/Review";

@Service()
export default class ReviewService extends BaseService {
  constructor() {
    super(Review);
  }

  public async getReviewById(id: number): Promise<Review> {
    id = this.sanitizeId(id);
    const review = await this.repository.findOneBy({
      review_id: id,
    });
    return review;
  }

  public async getReviewByUserId(id: number): Promise<Review[]> {
    id = this.sanitizeId(id);
    const reviews = await this.repository.findBy({
      user_id: id,
    });
    return reviews;
  }

  public async getReviewByProductId(id: number): Promise<Review[]> {
    id = this.sanitizeId(id);
    const reviews = await this.repository.findBy({
      product_id: id,
    });
    return reviews;
  }

  public async postReview(review: Review): Promise<Review> {
    console.log(review);
    const request = await this.repository.save(review);
    return request;
  }
  // public async postUser(user: User): Promise<number> {
  //     await this.repository.save(user);
  //     return user.user_id;
  // }
}
