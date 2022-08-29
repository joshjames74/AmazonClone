import React, { useState } from 'react';
import { CurrencyCode } from '../../../types';
import { ReviewType } from '../../../types/Review';
import { ProductCardType } from '../../components/product/types/ProductCardType';

export const ProductContext = React.createContext<{
    productInfo: ProductCardType;
    reviewList: ReviewType[];
    isInBasket: boolean;
    setIsInBasket?: (value: boolean) => void;
}>({
    productInfo: {
        title: 'Sample product',
        description: 'Description',
        imageURL: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572315935',
        price: 120,
        currencyCode: CurrencyCode.GBP,
        reviewScore: 4.3,
        reviewCount: 90000
    },
    reviewList: [
        {
            userInfo: {
                userId: '',
                userName: 'joshuajames',
                firstName: 'joshua',
                countryCode: 'UK',
                currencyCode: CurrencyCode.GBP,
                addresses: [
                    {
                        name: 'Joshua',
                        number: '33',
                        postCode: 'CF23 9BN',
                        county: 'Cardiff'
                    }
                ]
            },
            score: 3.2,
            title: 'Best product ever',
            content: 'This is a good product...',
            date: new Date(2010, 30, 4),
            images: ['']
        }
    ],
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
    const [reviewList, setReviewList] = useState<ReviewType[]>([]);
    const [isInBasket, setIsInBasket] = useState<boolean>(false);

    return (
        <ProductContext.Provider
        value={{
            productInfo: productInfo,
            isInBasket: isInBasket,
            reviewList: reviewList,
            setIsInBasket: setIsInBasket
        }}>
            {children}
        </ProductContext.Provider>
    )
}

