import { CurrencyCode } from '../../../../../types/Currency';

export type ProductCardType = {
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