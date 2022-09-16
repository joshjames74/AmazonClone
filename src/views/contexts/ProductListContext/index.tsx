import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getAllProductInfo, getAllProducts } from '../../../api/helpers/requests/product';
import { CurrencyCode } from '../../../types';
import { ProductInfo } from '../../../types';
import { Product } from '../../../api/entities';

export const ProductListContext = React.createContext<{
    productList: ProductInfo[];
}>({
    productList: [],
});

export const ProductListProvider = (props: { children?: JSX.Element }): JSX.Element => {

    const { children } = props;

    const [productList, setProductList] = useState<ProductInfo[]>([]);

    const getProducts = () => {
        getAllProductInfo().then((products: ProductInfo[]) => {
            console.log(products);
            if (!products) {
                return
            }
            setProductList(products);
        })
    }

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <ProductListContext.Provider
        value={{
            productList: productList,
        }}>
            {children}
        </ProductListContext.Provider>
    )
}

