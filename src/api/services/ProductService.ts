import { Service } from "typedi";
import { EntityTarget, In, IsNull, UpdateResult } from "typeorm";
import BaseService from "./BaseService";
import { Product } from "../entities/Product";
import { Entity } from "../../types";

@Service()
export default class ProductService extends BaseService {
  constructor() {
    super(Product);
  }

  // public async getProductById(id: number): Promise<Product> {
  //     id = this.sanitizeId(id);
  //     const product = await this.repository.findOneBy({
  //         product_id: id
  //     });
  //     return product;
  // }

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

  // public async getProductsByIds(ids: number[]): Promise<Product[]> {
  //     ids = ids.map((id) => this.sanitizeId(id));
  //     const products = await this.repository.findBy({
  //         product_id: In(ids)
  //     });
  //     return products;
  // }

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

  public async postProduct(product: Entity): Promise<Entity> {
    return this.postEntity(product);
  }

  // public async postProduct(product: Product): Promise<Product> {
  //     await this.repository.save(product);
  //     return product;
  // }

  public async deleteProductById(id: number): Promise<any> {
    id = this.sanitizeId(id);
    const request = await this.repository.delete({
      product_id: id,
    });
    return request;
  }
}
