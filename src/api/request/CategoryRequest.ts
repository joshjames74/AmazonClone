import { NextApiRequest, NextApiResponse } from "next";
import RequestHandler from ".";
import { QueryParams } from "../../redux/reducers/product";
import { Currency } from "../entities/Currency";
import { api_routes, routes } from "../routes";
import CategoryService from "../services/CategoryService";

export class CategoryRequest extends RequestHandler {
  private categoryService: CategoryService;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    super(req, res);
    this.categoryService = new CategoryService();
  }

  get() {
    if (this.matches(routes.category.all)) {
      return this.getAllCategories();
    }
    if (this.matches(routes.category.filtered)) {
      return this.getMostPopularCategories();
    }

    if (this.matches(routes.category.id)) {
      return this.getCategoryById();
    }
  }

  async getAllCategories() {
    const categories = await this.categoryService.getAllCategories();
    return this.sendResponseJSON({ categories: categories }, 200);
  }

  async getMostPopularCategories() {
    const params = this.req.query;
    const categories = await this.categoryService.getMostPopularCategories(
      params
    );
    return this.sendResponseJSON({ categories: categories }, 200);
  }

  async getCategoryById() {
    const { id } = this.req.query;
    const category = await this.categoryService.getCategoryById(id);
    return this.sendResponseJSON({ category: category }, 200);
  }
}
