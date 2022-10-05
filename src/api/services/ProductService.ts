import { Service } from "typedi";
import { EntityTarget, In, IsNull, Like, UpdateResult } from "typeorm";
import BaseService from "./BaseService";
import { Product } from "../entities/Product";
import { Entity } from "../../types";
import { Category } from "../entities";

@Service()
export default class ProductService extends BaseService {
  constructor() {
    super(Product);
  }

  public async getProductById(id: number): Promise<Product> {
    return await this.getById(id, "product_id");
  }

  public async getProductsByIds(ids: number[]): Promise<Product> {
    return await this.getByIds(ids, "product_id");
  }

  public async getAllProducts(): Promise<Product[]> {
    const products = await this.repository.find({});
    return products;
  }

  public async getProductBySearch(query: string, categories: Category[]): Promise<Product[]> {
    const product = await this.repository
      .createQueryBuilder()
      .select('*')
      .where("LOWER(title) LIKE :query", {query: `%${query.toLowerCase()}%`})
      .orWhere("LOWER(description) LIKE :query", {query: `%${query.toLowerCase()}%`})
      .execute();
    return product;
  }

  public async putProductById(
    id: number,
    fieldQuery: Object
  ): Promise<UpdateResult> {
    id = this.sanitizeId(id);
    const product = await this.repository
      .createQueryBuilder()
      .update(Product)
      .set(fieldQuery)
      .where({ user_id: id })
      .execute();
    return product;
  }

  public async putProductReviewById(id: number, reviewScore: number, remove: boolean = false): Promise<any> {
    id = this.sanitizeId(id);
    const product = await this.getProductById(id);
    const newReviewScore = !remove 
    ? ((Number(product.review_score) * Number(product.review_count))
      + Number(reviewScore))
      / (Number(product.review_count) + 1)
    : (
      Number(product.review_count) > 1 
      ? (Number(product.review_score) * Number(product.review_count) 
        - reviewScore)
        / (Number(product.review_count) - 1)
      : 0)

    const request = await this.repository
      .createQueryBuilder()
      .update(Product)
      .set({
        review_count: Number(product.review_count) + (remove ? -1 : 1),
        review_score: newReviewScore
      })
      .where({ product_id: id })
      .execute();
    return request;
  }

  public async postProduct(product: Entity): Promise<Entity> {
    return this.postEntity(product);
  }

  public async deleteProductById(id: number): Promise<any> {
    id = this.sanitizeId(id);
    const request = await this.repository.delete({
      product_id: id,
    });
    return request;
  }
}
