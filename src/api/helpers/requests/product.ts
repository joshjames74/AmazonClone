import { routes } from "../../routes";
import { insertIdIntoUrl } from "../../utils/formatting";
import axios from 'axios';
import { Currency, Product, User } from "../../entities";
import { CurrencyCode, ProductInfo } from "../../../types";
import { getUserById } from "../user";
import { getCurrencyById } from "./currency";

export function toProductEntity(product: ProductInfo, user_id: number, currency_id: number): Product {
    const productEntity = new Product();
    productEntity.user_id = user_id;
    productEntity.title = product.title;
    productEntity.description = product.description;
    productEntity.currency_id = currency_id;
    productEntity.price = product.price;
    productEntity.image_url = product.imageURL ? product.imageURL : '';
    productEntity.image_alt = product.imageAlt ? product.imageAlt : '';
    productEntity.url = product.url ? product.url : '';
    return productEntity;
}

export function toProductInfo(product: Product, currency: Currency): ProductInfo {
    const productInfo: ProductInfo = {
        productId: product.product_id,
        title: product.title,
        url: product.url,
        description: product.description,
        price: product.price,
        currencyCode: CurrencyCode[currency.code],
        imageURL: product.image_url,
        imageAlt: product.image_alt,
        reviewCount: product.review_count,
        reviewScore: product.review_score,
        // needs changing
        isInBasket: false,
    }
    return productInfo;
}

export async function getProductById(id: number): Promise<Product> {
    const url = insertIdIntoUrl(routes.product.product, 'product', id);
    const request = await axios(url, {
        method: 'GET'
    });
    return request.data.product;
}

export async function getAllProducts() {
    const url = routes.product.all;
    const request = await axios(url, {
        method: 'GET'
    });
    return request.data.products;
}

export async function getAllProductInfo() {
    const url = routes.product.all;
    const request = await axios(url, {
        method: 'GET'
    });
    // NEED TO CORRECT
    const currency: Currency = {
        currency_id: 1,
        symbol: '£',
        code: 'GBP'
    }
    return request.data.products.map((value: Product) => {
        return toProductInfo(value, currency);
    });
}

export async function getProductInfoById(id: number): Promise<ProductInfo> {
    const product = await getProductById(id);
    const currency = await getCurrencyById(product.currency_id);
    const value = toProductInfo(product, currency);
    return value;
}

export async function addProduct(product: ProductInfo, user_id: number, currency_id: number): Promise<boolean> {
    const productEntity = toProductEntity(product, user_id, currency_id);
    const request = await postProduct(productEntity);
    if (request.status === 200 || request.status === 201) {
        return true;
    }
    return false;
}

export async function postProduct(product: Product) {
    const route = routes.product.post;
    const request = await axios(route, {
        method: 'POST',
        data: {
            product: product
        }
    });
    return request;
}