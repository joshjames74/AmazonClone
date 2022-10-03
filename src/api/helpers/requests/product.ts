import { routes } from "../../routes";
import { insertIdIntoUrl } from "../../utils/formatting";
import axios from "axios";
import { Category, Product } from "../../entities";

export async function getProductById(id: number): Promise<Product> {
  const url = insertIdIntoUrl(routes.product.product, "product", id);
  const request = await axios(url, {
    method: "GET",
  });
  return request.data.product;
}

export async function getAllProducts() {
  const url = routes.product.all;
  const request = await axios(url, {
    method: "GET",
  });
  return request.data.products;
}

export async function getProductBySearch(query: string, categories: Category[]): Promise<Product[]> {
  const url = routes.product.search;
  const request = await axios(url, {
    method: "GET",
    params: {
      query: query,
      categories: categories
    }
  })
  return request.data.products;
}

export async function postProduct(product: Product) {
  const route = routes.product.post;
  const request = await axios(route, {
    method: "POST",
    data: {
      product: product,
    },
  });
  return request;
}
