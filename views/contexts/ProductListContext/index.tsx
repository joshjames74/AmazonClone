import React, { useState } from 'react';
import { CurrencyCode } from '../../../types';
import { ProductCardType } from '../../components/product/types/ProductCardType';

export const ProductListContext = React.createContext<{
    productList: ProductCardType[];
}>({
    productList: [{
        title: 'iPhone 8',
        description: 'This is a phone',
        price: 800,
        imageURL: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572315935',
        currencyCode: CurrencyCode.GBP,
        reviewScore: 2.3,
        reviewCount: 300,
    }, {
        title: 'iPhone 8',
        description: 'This is a phone',
        price: 800,
        imageURL: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572315935',
        currencyCode: CurrencyCode.GBP,
        reviewScore: 2.3,
        reviewCount: 300,
    }, {
        title: 'iPhone 8',
        description: 'This is a phone',
        price: 800,
        imageURL: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572315935',
        currencyCode: CurrencyCode.GBP,
        reviewScore: 2.3,
        reviewCount: 300,
    }, {
        title: 'iPhone 8',
        description: 'This is a phone',
        price: 800,
        imageURL: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572315935',
        currencyCode: CurrencyCode.GBP,
        reviewScore: 2.3,
        reviewCount: 300,
    }, {
        title: 'iPhone 8',
        description: 'This is a phone',
        price: 800,
        imageURL: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572315935',
        currencyCode: CurrencyCode.GBP,
        reviewScore: 2.3,
        reviewCount: 300,
    }],
});

export const ProductListProvider = (props: { children?: JSX.Element }): JSX.Element => {

    const children: any = props;

    const [productList, setProductList] = useState<ProductCardType[]>([
        {
            title: 'iPhone 8',
            description: 'This is a phone',
            price: 800,
            imageURL: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572315935',
            currencyCode: CurrencyCode.GBP,
            reviewScore: 2.3,
            reviewCount: 300,
        },
        {
            title: 'iPhone 8',
            description: 'This is a phone',
            price: 800,
            imageURL: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572315935',
            currencyCode: CurrencyCode.GBP,
            reviewScore: 2.3,
            reviewCount: 300,
        },
        {
            title: 'iPhone 8',
            description: 'This is a phone',
            price: 800,
            imageURL: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572315935',
            currencyCode: CurrencyCode.GBP,
            reviewScore: 2.3,
            reviewCount: 300,
        },
    ]);

    return (
        <ProductListContext.Provider
        value={{
            productList: productList,
        }}>
            {children}
        </ProductListContext.Provider>
    )
}

