import { routes } from "../../routes";
import { insertIdIntoUrl } from "../../utils/formatting";
import axios from "axios";
import { Product } from "../../entities";

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
