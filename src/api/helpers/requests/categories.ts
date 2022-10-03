import { Category } from "../../entities";
import { routes } from "../../routes";
import axios from "axios";

export async function getAllCategories(): Promise<Category[]> {
  const route = routes.category.all;
  const categories = await axios(route, {
    method: "GET",
  });
  return categories.data.categories;
}

export async function getAllParentCategories(): Promise<Category[]> {
  const route = routes.category.allParents;
  const categories = await axios(route, {
    method: "GET",
  });
  return categories.data.categories;
}
