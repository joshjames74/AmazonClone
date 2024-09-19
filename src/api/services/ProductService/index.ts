
import 'reflect-metadata';
import { Service } from "typedi";
import {
  SelectQueryBuilder,
  UpdateResult,
} from "typeorm";
import BaseService from "../BaseService";
import { Product } from "../../entities/Product";
import { Entity } from "../../../types";
import { Category, OrderItem } from "../../entities";
import { FilterType, QueryParams } from "../../../redux/reducers/product";

type SortType = {
  type?: "PRICE_LOW_HIGH" | "PRICE_HIGH_LOW" | "REVIEW";
};

export type ProductResponse = {
  products: Product[];
  product_count: number;
};

export type CategoryResponse = {
  product_count: number;
  category: Category;
};

@Service()
export default class ProductService extends BaseService {
  constructor() {
    super(Product);
  }

  public createQuery(params: QueryParams): SelectQueryBuilder<Product> {

    // create raw query object. does not order, offset, or limit
    return this.repository
      .createQueryBuilder()
      .where("review_score >= :reviewMin",
        { reviewMin: params.reviewMin }
      )
      .andWhere("title ILIKE :title", {
        title: `%${params.query ? params.query.toLowerCase() : ""}%`,
      })
      .andWhere("price >= :priceMin",
        {
          priceMin: params.priceMin
        })
      .andWhere("price <= :priceMax", {
        priceMax: params.priceMax
      })
      .andWhere('"Product"."category_ids" && :categoryIds', {
        categoryIds: JSON.parse(`${params.categories}`)
      });
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

  public async getProductCategoriesBySearch(
    params: QueryParams
  ): Promise<CategoryResponse[]> {
    const categories_raw = await this.repository.query(
      "\
                      SELECT product_count, category.name as name, category.category_id as category_id \
                        FROM \
                          (SELECT category_id, COUNT(*) as product_count \
                          FROM product, UNNEST(product.category_ids) as category_id \
                          GROUP BY category_id) as cat \
                        LEFT JOIN category \
                        ON category.category_id = cat.category_id \
                        ORDER BY product_count DESC, name ASC\
                        LIMIT 20"
    );

    // now format
    const categories = categories_raw.map((row) => ({
      product_count: row.product_count,
      category: {
        name: row.name,
        category_id: row.category_id,
      },
    }));

    return categories;
  }

  public async getProductBySearch(
    params: QueryParams
  ): Promise<ProductResponse> {

    var orderColumn: string = "product_id";
    var orderDirection: "ASC" | "DESC" = "ASC";

    switch (params.filterType) {
      case FilterType.PRICE_LOW_HIGH:
        orderColumn = "price";
        orderDirection = "ASC";
        break;
      case FilterType.PRICE_HIGH_LOW:
        orderColumn = "price";
        orderDirection = "DESC";
        break;
      case FilterType.REVIEW_SCORE:
        orderColumn = "review_score";
        orderDirection = "DESC";
        break;
      case FilterType.POPULARITY:
        orderColumn = "order_count";
        orderDirection = "DESC";
      default:
        break;
    }

    // to do: make query search in description
    const product_query = this.createQuery(params);
    const product_response = await product_query
      .orderBy(orderColumn, orderDirection)
      .offset(params.start)
      .limit(params.end - params.start)
      .getManyAndCount();

    const product = {
      products: product_response[0],
      product_count: product_response[1],
    };
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

  public async putProductReviewById(
    id: number,
    reviewScore: number,
    remove: boolean = false
  ): Promise<any> {
    id = this.sanitizeId(id);
    const product = await this.getProductById(id);
    const newReviewScore = !remove
      ? (Number(product.review_score) * Number(product.review_count) +
        Number(reviewScore)) /
      (Number(product.review_count) + 1)
      : Number(product.review_count) > 1
        ? (Number(product.review_score) * Number(product.review_count) -
          reviewScore) /
        (Number(product.review_count) - 1)
        : 0;

    const request = await this.repository
      .createQueryBuilder()
      .update(Product)
      .set({
        review_count: Number(product.review_count) + (remove ? -1 : 1),
        review_score: newReviewScore,
      })
      .where({ product_id: id })
      .execute();
    return request;
  }

  public async putProductOrderCountByOrderItem(
    orderItems: OrderItem[]
  ): Promise<void> {
    for (const orderItem of orderItems) {
      await this.repository
        .createQueryBuilder()
        .update(Product)
        .set({
          order_count: () => `order_count + ${orderItem.quantity}`,
        })
        .where({ product_id: orderItem.product.product_id })
        .execute();
    }
    return;
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
