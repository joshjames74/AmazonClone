import { Service } from "typedi";
import { EntityTarget, In } from "typeorm";
import BaseService from "./BaseService";
import { Category } from "../entities";

@Service()
export default class CategoryService extends BaseService {
  constructor() {
    super(Category);
  }

  
  public async getAllParentCategories(): Promise<Category[]> {
    const categories = await this.treeRepository.findRoots();
    return categories;
  }

  public async getAllCategories(): Promise<Category[]> {
    const parentCategories = await this.getAllParentCategories();
    let categories = []
    for (const parent of parentCategories) {
      const subCategories = await this.treeRepository.findDescendants(parent);
      categories.push(...subCategories);
    }
    return categories;
  }
}
