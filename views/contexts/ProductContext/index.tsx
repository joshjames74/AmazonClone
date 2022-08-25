import React, { useState } from 'react';
import { CurrencyCode } from '../../../types';
import { ProductCardType } from '../../components/product/types/ProductCardType';

export const ProductContext = React.createContext<{
    productInfo: ProductCardType;
    isInBasket: boolean;
    setIsInBasket?: (value: boolean) => void;
}>({
    productInfo: {
        title: '',
        price: 0,
        currencyCode: CurrencyCode.GBP,
        description: '',
        reviewCount: 0,
        reviewScore: 0,
        imageAlt: '',
        imageURL: '',
        url: '',
    },
    isInBasket: false,
});

export const ProductProvider = (props: { children?: JSX.Element }): JSX.Element => {

    const children: any = props;

    const [productInfo, setProductInfo] = useState<ProductCardType>({
        title: '',
        price: 0,
        currencyCode: CurrencyCode.GBP,
        description: '',
        reviewCount: 0,
        reviewScore: 0,
        imageAlt: '',
        imageURL: '',
        url: '',
    });
    const [isInBasket, setIsInBasket] = useState<boolean>(false);

    return (
        <ProductContext.Provider
        value={{
            productInfo: productInfo,
            isInBasket: isInBasket,
            setIsInBasket: setIsInBasket
        }}>
            {children}
        </ProductContext.Provider>
    )
}

