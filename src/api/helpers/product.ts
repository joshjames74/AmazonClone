import { In, Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Product } from "../entities/Product";
import { sanitizeId } from "../sanitation/id";
// import { ProductInfo } from "../../types";
// import { Currency } from "../entities/Currency";

function getRepository(): Repository<Product> {
  return AppDataSource.getRepository(Product);
}

// async function productToProductInfo(product: Product): Promise<ProductInfo> {
//     // add optional properties

//     // const currency = await getCurrencyById(product.currency_id);

//     const productInfo: ProductInfo = {
//         productId: product.product_id,
//         title: product.title,
//         description: product.description,
//         price: product.price,
//         currencyCode: Currency[currency.code],
//         reviewCount: product.review_count,
//         reviewScore: product.review_score,
//     }

//     return productInfo;
// }

export async function getProductById(id: number): Promise<Product> {
  const repository = getRepository();
  id = sanitizeId(id);
  const request: any = await repository.findOneBy({
    product_id: id,
  });
  return request.product;
}

// export async function getAllProducts(): Promise<Product[]> {
//     const url = 'http://localhost:3000/product';
// }

// export async function getProductsById(ids: number[]): Promise<Product[]> {
//     const repository = getRepository();
//     ids = ids.map((id) => sanitizeId(id));
//     const products = await repository.findBy({
//         product_id: In(ids)
//     });
//     return products;
// };

// export async function getProductInfoById(id: number): Promise<ProductInfo> {
//     const product = await getProductById(id);
//     return productToProductInfo(product);
// };

// export async function getProductsInfoById(ids: number[]): Promise<ProductInfo[]> {
//     const products = await getProductsById(ids);
//     let productsInfo: ProductInfo[] = []
//     for (const product of products) {
//         const productInfo = await productToProductInfo(product);
//         productsInfo.push(productInfo);
//     }
//     return productsInfo;
// };

export async function postProduct(product: Product): Promise<number> {
  //product = sanitize(product);
  const repository = getRepository();
  await repository.save(product);
  return product.product_id;
}

export {};
