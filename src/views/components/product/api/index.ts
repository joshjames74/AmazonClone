import { Product } from '../../../../api/entities/index';
import { ProductInfo } from "../../../../types";
import { getCurrencyByCode } from "../../../../api/helpers/currency";
import { postProduct } from "../../../../api/helpers/product";

export async function convertToProduct(product: ProductInfo, user_id: number): Promise<Product> {

    const currency = await getCurrencyByCode(product.currencyCode);

    const productORM = new Product();
    productORM.title = product.title;
    productORM.description = product.description;
    productORM.currency_id = currency.currency_id;
    productORM.user_id = user_id;
    productORM.price = product.price;
    productORM.image_url = product.imageURL ? product.imageURL : '';
    productORM.image_alt = product.imageAlt ? product.imageAlt : '';
    productORM.url = product.url ? product.url : '';

    if (product.reviewCount > 0) {
        productORM.review_count = product.reviewCount;
        productORM.review_score = product.reviewScore ? product.reviewScore : null
    };

    return productORM;
}

export async function saveProduct(product: Product): Promise<void> {
    await postProduct(product);
}

export async function addProduct(product: ProductInfo, user_id: number): Promise<void> {
    const productToAdd = await convertToProduct(product, user_id);
    saveProduct(productToAdd);
}