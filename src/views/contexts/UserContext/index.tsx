import React, { useState, useEffect } from 'react';
import { AddressType, CurrencyCode } from '../../../types';
import { UserInfo } from '../../../types/UserInfo';
import { ProductInfo } from '../../../types';
import { useRouter } from 'next/router';
import { idToNumber } from '../../../api/utils/queryTransformer';
import { getUserById } from '../../../api/helpers/requests/user';

export const UserContext = React.createContext<{
    userInfo: UserInfo;
    currentAddressIndex: number;
    currentAddress: AddressType;
    isLoggedIn: boolean;
    setCurrentAddressIndex: ((index: number) => void) | undefined;
    basketCount: number;
    basket: ProductInfo[];
    addToBasket: (value: ProductInfo[]) => void;
}>({
    userInfo: {
        userId: 0,
        userName: '',
        firstName: '',
        title: '',
        addresses: [],
        countryCode: '',
        currencyCode: CurrencyCode.GBP,
    },
    currentAddressIndex: 0,
    currentAddress: {
        name: '',
        number: '',
        postCode: '',
        county: ''
    },
    setCurrentAddressIndex: undefined,
    isLoggedIn: false,
    basketCount: 0,
    basket: [],
    addToBasket: () => console.log('')
});

export const UserProvider = (props: { children?: JSX.Element}) => {

    const { children }: any = props;
    const router = useRouter();

    const { id } = router.query;


    const [userInfo, setUserInfo] = useState<UserInfo>({
            userId: 0,
            userName: 'Joshua James',
            firstName: 'Joshua',
            title: 'Mr',
            addresses: [{
                name: 'Joshua',
                postCode: 'BA2 9PD',
                number: '15',
                county: 'Bath and Northeast Summerset'
            }, {
                name: 'Brian',
                postCode: 'CF23 9BN',
                number: '33',
                county: 'Cardiff'
            }],
            countryCode: 'UK',
            currencyCode: CurrencyCode.GBP,
        }
    );
    const [currentAddressIndex, setCurrentAddressIndex] = useState<number>(0);
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [currentAddress, setCurrentAddress] = useState<AddressType>(userInfo?.addresses[currentAddressIndex]);
    const [basket, setBasket] = useState<ProductInfo[]>([{
        productId: 0,
        title: 'Sample product',
        description: 'Description',
        imageURL: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572315935',
        price: 120,
        currencyCode: CurrencyCode.GBP,
        reviewScore: 4.3,
        reviewCount: 90000
    }, {
        productId: 0,
        title: 'Sample product',
        description: 'Description',
        imageURL: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572315935',
        price: 120,
        currencyCode: CurrencyCode.GBP,
        reviewScore: 4.3,
        reviewCount: 90000
    }]);
    const [basketCount, setBasketCount] = useState<number>(basket.length);

    // useEffect(() => {
    //     setCurrentAddress(userInfo.addresses[currentAddressIndex])
    // }, [currentAddressIndex])

    useEffect(() => {
        if (!id) {
            return
        }
        const idNumeric = idToNumber(id);
        getUserById(idNumeric).then((value) => console.log(value));
    }, [id])

    useEffect(() => {
        setBasketCount(basket.length);
    }, [basket])

    const addToBasket = (values: ProductInfo[]): void => {
        setBasket([...basket, ...values]);
    }

    return (
        <UserContext.Provider
        value={{
            userInfo: userInfo,
            currentAddressIndex: currentAddressIndex,
            currentAddress: currentAddress,
            isLoggedIn: isLoggedIn,
            setCurrentAddressIndex: setCurrentAddressIndex,
            basketCount: basketCount,
            basket: basket,
            addToBasket: addToBasket
        }}>
            {children}
        </UserContext.Provider>
    )
}