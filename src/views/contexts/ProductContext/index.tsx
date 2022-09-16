import React, { useState } from 'react';
import { CurrencyCode } from '../../../types';
import { ProductInfo } from '../../../types/ProductInfo';
import { ReviewType } from '../../../types/Review';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { getReviewListByProductId } from '../../../api/helpers/requests/review';
import { getProductInfoById } from '../../../api/helpers/requests/product';

export const ProductContext = React.createContext<{
    productInfo: ProductInfo;
    reviewList: ReviewType[];
    isInBasket: boolean;
    setIsInBasket?: (value: boolean) => void;
    onUpdateReview: () => void;
}>({
    productInfo: {
        productId: 1,
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
                userId: 1,
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
    onUpdateReview: null
});

export const ProductProvider = (props: { children?: JSX.Element }): JSX.Element => {

    const { children } = props;
    const router = useRouter();
    const { id } = router.query;
    
    console.log(id);

    const [productInfo, setProductInfo] = useState<ProductInfo>({
        productId: 0,
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

    const idToNumber = (id: (string[] | string)): number => {
        if (id instanceof Array) {
            id = id[0]
        }
        const idNumber = parseInt(id);
        return idNumber;
    }

    const getReviews = () => {
        if (!id) {
            return;
        }
        const idNumeric = idToNumber(id);
        getReviewListByProductId(idNumeric).then((reviews: ReviewType[]) => {
            if (!reviews) {
                return
            }
            setReviewList(reviews);
        })
    }

    const getProduct = () => {
        if (!id) {
            return;
        }
        const idNumeric = idToNumber(id);
        getProductInfoById(idNumeric).then((product: ProductInfo) => {
            if (!product) {
                return
            };
            console.log(product);
            setProductInfo(product);
        })
    }

    useEffect(() => {
        getProduct();
        getReviews();
        // if (!id) {
        //     return;
        // }
        // const idNumeric = idToNumber(id);
        // getProductInfoById(idNumeric).then((product: ProductInfo) => {
        //     if (!product) {
        //         return
        //     };
        //     console.log(product);
        //     setProductInfo(product);
        // })
        // getReviewListByProductId(idNumeric).then((reviews: ReviewType[]) => {
        //     if (!reviews) {
        //         return
        //     }
        //     setReviewList(reviews);
        // })
    }, [id])

    return (
        <ProductContext.Provider
        value={{
            productInfo: productInfo,
            isInBasket: isInBasket,
            reviewList: reviewList,
            setIsInBasket: setIsInBasket,
            onUpdateReview: getReviews
        }}>
            {children}
        </ProductContext.Provider>
    )
}

