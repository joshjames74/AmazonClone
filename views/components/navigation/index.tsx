import AccountButton from "./AccountButton";
import BasketButton from "./BasketButton";
import DeliveryButton from "./DeliveryButton";
import LocationButton from "./LocationButton";
import LogoWrapper from "./LogoWrapper";
import ReturnsOrdersButton from "./ReturnsOrdersButton";
import SearchBar from "./SearchBar";
import { Box } from '@chakra-ui/react';
import { LogoWrapperType } from "./LogoWrapper/types";
import { DeliveryButtonType } from "./DeliveryButton/types";
import { SearchBarType } from "./SearchBar/types";
import { LocationButtonType } from "./LocationButton/types";
import { BasketButtonType } from "./BasketButton/types";
import { CurrencyCode } from "../../../types";

export default function Navigation(): JSX.Element {

    const logoWrapperProps: LogoWrapperType = {
        imageURL: ''
    }

    const deliveryButtonProps: DeliveryButtonType = {
        name: 'Joshua',
        loggedIn: false,
        countryCode: CurrencyCode.GBP
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


    return (
        <Box display='flex' flexDirection='row' w='100%' h='20px'>
            <LogoWrapper {...logoWrapperProps}/>
            {/* <DeliveryButton {...deliveryButtonProps}/>
            <SearchBar {...searchBarProps}/>
            <LocationButton {...locationButtonProps}/>
            <AccountButton />
            <ReturnsOrdersButton />
            <BasketButton {...basketButtonProps}/> */}
        </Box>
    )
}
