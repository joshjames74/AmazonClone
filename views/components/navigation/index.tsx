import AccountButton from "./AccountButton";
import BasketButton from "./BasketButton";
import DeliveryButton from "./DeliveryButton";
import LocationButton from "./LocationButton";
import LogoWrapper from "./LogoWrapper";
import ReturnsOrdersButton from "./ReturnsOrdersButton";
import SearchBar from "./SearchBar";
import { Box } from '@chakra-ui/react';
import { LogoWrapperType } from "./types/LogoWrapperType";
import { DeliveryButtonType } from "./types/DeliveryButtonType";
import { SearchBarType } from "./types/SearchBarType";
import { LocationButtonType } from "./types/LocationButtonType";
import { BasketButtonType } from "./types/BasketButton";
import { CurrencyCode, UserType } from "../../../types";
import ProductCardWrapper from "../product/ProductCardWrapper";
import { ProductCardType } from "../product/types/ProductCardType";
import { ProductCardWrapperType } from "../product/types/ProductCardWrapperType";
import { CardType } from "../product/enums/CardType";
import { AccountButtonType } from "./types/AccountButton";
import { AuthProvider, UserProvider } from '../../contexts';

export default function Navigation(): JSX.Element {

    const logoWrapperProps: LogoWrapperType = {
        imageURL: 'https://www.logodesign.net/logo/eye-and-house-5806ld.png'
    }

    const deliveryButtonProps: DeliveryButtonType = {
        name: 'Joshua',
        loggedIn: false,
        countryCode: CurrencyCode.GBP,
        addresses: [
        {
            name: 'Joshua',
            county: 'Cardiff',
            number: '50',
            postCode: 'CF23 9BN'
        },
        {
            name: 'Random person',
            county: 'London',
            number: '43',
            postCode: 'SW1 1AD'
        }]
    }

    const searchBarProps: SearchBarType = {
        categories: ['Home', 'Outdoor']
    }

    const locationButtonProps: LocationButtonType = {
        countryCode: 'UK',
        currencyCode: CurrencyCode.GBP
    }

    const basketButtonProps: BasketButtonType = {
        itemCount: 0
    };

    const productCardProps: ProductCardType = {
        title: 'iPhone 8',
        description: 'This is a phone',
        price: 800,
        imageURL: 'https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572315935',
        currencyCode: CurrencyCode.GBP,
        reviewScore: 2.3,
        reviewCount: 300,
    }

    const productWrapperProps: ProductCardWrapperType = {
        cardType: CardType.wide
    }

    const accountButtonProps: AccountButtonType = {
        isLoggedIn: false
    }


    return (
                <Box
                display='flex'
                flexDirection='row'
                w='100%'
                h='50px'
                borderWidth='3px'
                borderColor='black'
                p='1px'
                bgColor={'#232f3e'}
                >
                    <LogoWrapper {...logoWrapperProps}/>
                    <DeliveryButton {...deliveryButtonProps}/>
                    <SearchBar {...searchBarProps}/>
                    <LocationButton {...locationButtonProps}/>
                    <AccountButton {...accountButtonProps}/>
                    <ReturnsOrdersButton />
                    <BasketButton {...basketButtonProps}/>
                </Box>
    )
}
