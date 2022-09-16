import { api_routes } from "../routes";
import axios from "axios";

export async function getProductById(id: number): Promise<any> {
  const route = `http://localhost:3000/api/product?id=${id}`;
  const product = await axios({
    method: "GET",
    url: route,
  });
  return product.data;
}
