import { InfoIcon } from '@chakra-ui/icons';
import { Box } from '@chakra-ui/react';
import { useState } from 'react';
import { AddressType } from '../../../../types';

type DeliveryButtonType = {
    name: string;
    loggedIn: boolean;
    addresses?: AddressType[];
    countryCode: string;
};

export default function DeliveryButton(props: DeliveryButtonType): JSX.Element {

    const [addressIndex, setAddressIndex] = useState<number>(0);

    const loggedInButton = () => {
        if (!props.addresses || props.addresses.length === 0) {
            return;
        };

        return (
            <Box display='flex' flexDirection='column'>
                <Box>Delivery to {props.addresses[addressIndex].name}</Box>
                <Box>{props.addresses[addressIndex].county} {props.addresses[addressIndex].postcode}</Box>
            </Box>
        );
    };

    const loggedOutButton = () => {
        return (
            <Box
            display='flex'
            flexDirection='column'
            padding='5px'
            fontSize='10px'>
                <Box>Hello</Box>
                <b><InfoIcon /> Select your address</b>
            </Box>
        );
    };

    return (
        <Box 
        display='flex'
        flexDirection='row'
        textColor='whiteAlpha.900'
        h='100%'
        w='8%'
        minW='20vh'
        >
            {props.loggedIn ? loggedInButton() : loggedOutButton()}
        </Box>
    )
}