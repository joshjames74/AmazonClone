import { Service } from "typedi";
import { EntityTarget, In, Repository } from "typeorm";
import BaseService from "../BaseService";
import { Category, Product } from "../../entities";
import RepositoryService from "../RepositoryService";
import ProductService, { CategoryResponse } from "../ProductService";
import { QueryParams } from "../../../redux/reducers/product";

@Service()
export default class CategoryService extends BaseService {
  productService: ProductService;

  constructor() {
    super(Category);
    this.productService = new ProductService();
  }

  public async getMostPopularCategories(): Promise<Category[]> {
    const categories = await this.repository.query(
      `SELECT cat.*, COUNT(*) AS category_count FROM Product p CROSS JOIN unnest(p.category_ids) AS c(category_id) INNER JOIN Category cat ON c.category_id = cat.category_id GROUP BY cat.category_id, cat.name ORDER BY category_count DESC LIMIT 20`
    );
    return categories;
  }

  public async getCategoryById(id: number): Promise<Category> {
    const category = await this.repository.findOneBy({ category_id: id });
    return category;
  }

  public async getAllCategories(
    params: QueryParams
  ): Promise<CategoryResponse[]> {
    return await this.productService.getProductCategoriesBySearch(params);
  }
}
