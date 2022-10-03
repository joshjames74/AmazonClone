import { NextApiRequest, NextApiResponse } from "next";
import RequestHandler from ".";
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
    if (this.matches(routes.category.allParents)) {
      return this.getAllParentCategories();
    }
  }

  async getAllCategories() {
    const categories = await this.categoryService.getAllCategories();
    return this.sendResponseJSON({ categories: categories }, 200);
  }

  async getAllParentCategories() {
    const categories = await this.categoryService.getAllParentCategories();
    return this.sendResponseJSON({ categories: categories }, 200);
  }
}
