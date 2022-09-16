import { InfoIcon } from '@chakra-ui/icons';
import { Box, Button, ModalContent, propNames } from '@chakra-ui/react';
import { ClassNames } from '@emotion/react';
import { useState, useContext, useEffect } from 'react';
import { createContext } from 'react';
import { AddressType } from '../../../../types';
import SelectAddressModal from './modals/SelectAddressModal';
import SetAddressModal from './modals/SetAddressModal';
import { AuthContext, UserContext } from '../../../contexts';
import { ModalContext } from '../../../contexts/ModalContext';

type DeliveryButtonType = {
    name: string;
    loggedIn: boolean;
    addresses?: AddressType[];
    countryCode: string;
};

export default function DeliveryButton(props: DeliveryButtonType): JSX.Element {

    const { isLoggedIn } = useContext(AuthContext);
    const { currentAddress } = useContext(UserContext);

    const { showSelectAddressModal, setShowSelectAddressModal } = useContext(ModalContext);

    const loggedInButton = () => {
        if (!currentAddress) {
            return;
        };

        return (
            <Button
            display='flex'
            flexDirection='column'
            padding='5px'
            fontSize='10px'
            bgColor='blackAlpha.200'
            onClick={() => setShowSelectAddressModal(!showSelectAddressModal)}>
                <Box textAlign='left'>
                    Deliver to {currentAddress.name}
                </Box>
                <Box textAlign='left'>
                    {currentAddress.postCode}
                </Box>
            </Button>
        );
    };

    const loggedOutButton = () => {
        return (
            <Box
            display='flex'
            flexDirection='column'
            padding='5px'
            fontSize='10px'
            onClick={() => setShowSelectAddressModal(!showSelectAddressModal)}>
                <Box>Hello</Box>
                <b><InfoIcon /> Select your address</b>
            </Box>
        );
    };

    const onClose = () => {
        setShowSelectAddressModal(false);
    }

    const selectAddressModalProps = {
        isOpen: showSelectAddressModal,
        onClose: onClose,
    };

    const renderAddressModal = (): JSX.Element => {
        if (isLoggedIn) {
            return (
                <SelectAddressModal {...selectAddressModalProps}/>
            );
        };
        if (!isLoggedIn) {
            return (
                <SetAddressModal />
            );
        };
        return <></>    
    }

    return (
        <Box
        className='deliver-button' 
        display='flex'
        flexDirection='row'
        textColor='whiteAlpha.900'
        h='100%'
        w='8%'
        minW='20vh'
        >
            {isLoggedIn ? loggedInButton() : loggedOutButton()}
            {renderAddressModal()}
        </Box>
    )
}