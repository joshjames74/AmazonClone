import { api_routes } from "../routes";
import axios from "axios";
import { Product } from "../entities";

export async function getProductById(id: number): Promise<Product> {
  const route = `http://localhost:3000/api/product/${id}`;
  const product = await axios({
    method: "GET",
    url: route,
  });
  return product.data.product;
}

export async function getReviewByUserId(id: number): Promise<any> {
  const route = `http://localhost:3000/api/product/${id}/review?id=${id}`;
  const reviews = await axios({
    method: "GET",
    url: route,
  });
  return reviews.data;
}
