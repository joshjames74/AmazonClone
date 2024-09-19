import { routes } from "../../routes";
import { insertIdIntoUrl } from "../../utils/formatting";
import axios from "axios";
import { Category, Product } from "../../entities";
import { ProductResponse } from "../../services/ProductService";
import { QueryParams } from "../../../redux/reducers/product";

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

export async function getProductBySearch(
  params: QueryParams
): Promise<ProductResponse> {
  if (!params) {
    return;
  }
  const url = routes.product.search;
  const request = await axios(url, {
    method: "GET",
    params: {
      query: params.query,
      categories: JSON.stringify(params.categories),
      reviewMin: params.reviewMin,
      priceMin: params.priceMin,
      priceMax: params.priceMax,
      start: params.start,
      end: params.end,
      filterType: params.filterType,
    },
  });
  return request.data.product_response;
}

export async function getProductCountBySearch(
  query: string,
  categories: number[],
  reviewMin: number,
  priceMin: number,
  priceMax: number,
  start: number,
  end: number
): Promise<number> {
  const url = routes.product.count;
  const request = await axios(url, {
    method: "GET",
    params: {
      query: query,
      categories: categories,
      reviewMin: reviewMin,
      priceMin: priceMin,
      priceMax: priceMax,
      start: start,
      end: end,
    },
  });
  return request.data.productCount;
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
