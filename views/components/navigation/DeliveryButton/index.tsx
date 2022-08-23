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
            <Box display='flex' flexDirection='column'>
                <Box>Hello</Box>
                <Box>Select your address</Box>
            </Box>
        );
    };

    return (
        <Box display='flex' flexDirection='row'>
            {/* <InfoIcon maxW='10px'/> */}
            {props.loggedIn ? loggedInButton() : loggedOutButton()}
        </Box>
    )
}