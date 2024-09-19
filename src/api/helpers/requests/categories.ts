import { Category } from "../../entities";
import { routes } from "../../routes";
import axios from "axios";
import { QueryParams } from "../../../redux/reducers/product";
import { CategoryResponse } from "../../services/ProductService";

export async function getAllCategories(): Promise<CategoryResponse[]> {
  const route = routes.category.all;
  const categories = await axios(route, {
    method: "GET",
  });
  return categories.data.categories;
}

export async function getMostPopularCategories(
  params: QueryParams
): Promise<any> {
  const route = routes.category.filtered;
  const categories = await axios(route, {
    method: "GET",
    params: params,
  });
  return categories.data.categories;
}

export async function getCategoryById(id: number): Promise<Category> {
  const route = routes.category.id;
  const categories = await axios(route, {
    method: "GET",
    params: { id: id },
  });
  return categories.data.category;
}
