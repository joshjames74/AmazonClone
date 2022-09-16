import { CurrencyCode } from "..";

export type ProductInfo = {
  productId: number;
  title: string;
  url?: string;
  description: string;
  imageURL?: string;
  imageAlt?: string;
  price: number;
  currencyCode: CurrencyCode;
  reviewScore: number;
  reviewCount: number;
  isInBasket?: boolean;
};
