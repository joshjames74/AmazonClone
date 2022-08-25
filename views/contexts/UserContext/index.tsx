import React, { useState, useEffect } from 'react';
import { AddressType, CurrencyCode } from '../../../types';
import { UserInfo } from '../../../types/UserInfo';

export const UserContext = React.createContext<{
    userInfo: UserInfo;
    currentAddressIndex: number;
    currentAddress: AddressType;
    isLoggedIn: boolean;
    setCurrentAddressIndex: ((index: number) => void) | undefined;
    basketCount: number;
}>({
    userInfo: {
        userId: '',
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
    basketCount: 0
});

export const UserProvider = (props: { children?: JSX.Element}) => {

    const { children }: any = props;

    const [userInfo, setUserInfo] = useState<UserInfo>({
            userId: 'string',
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
    const basketCount = 5;

    useEffect(() => {
        setCurrentAddress(userInfo.addresses[currentAddressIndex])
    }, [currentAddressIndex])

    return (
        <UserContext.Provider
        value={{
            userInfo: userInfo,
            currentAddressIndex: currentAddressIndex,
            currentAddress: currentAddress,
            isLoggedIn: isLoggedIn,
            setCurrentAddressIndex: setCurrentAddressIndex,
            basketCount: basketCount
        }}>
            {children}
        </UserContext.Provider>
    )
}