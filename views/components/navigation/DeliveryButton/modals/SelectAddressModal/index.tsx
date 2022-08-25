import { AddressType, UserType } from '../../../../../../types';
import { Radio, ModalFooter, Button, Box, RadioGroup, Modal, ModalContent, ModalCloseButton, ModalOverlay, ModalHeader, useDisclosure } from '@chakra-ui/react';
import { useState, useContext } from 'react';
import { AuthContext, UserContext } from '../../../../../contexts';

type SelectAddressModalType = {
    isOpen: boolean;
    onClose: () => void;
}

export default function SelectAddressModal(props: SelectAddressModalType): JSX.Element {

    // const { isOpen, onClose, onOpen } = useDisclosure();

    const { userInfo, currentAddressIndex, setCurrentAddressIndex } = useContext(UserContext);

    const handleClick = (nextVal: string) => {
        // Convert next val to number as the
        // radio group onChange function argument
        // is of type string
        if (isNaN(nextVal as any)) {
            return;
        };

        const key: number = parseInt(nextVal);

        if (!userInfo?.addresses || !setCurrentAddressIndex) {
            return;
        };
        if (key < 0 || key > userInfo.addresses.length) {
            return;
        };
        
        setCurrentAddressIndex(key);
    }

    const renderCheckBox = (address: AddressType, key: number): JSX.Element => {
        return (
            <Radio value={key} key={key}>
                <Box
                display='flex'
                flexDirection='row'>
                    <Box><b>{address.name}: </b>{address.county}, {address.postCode}</Box>
                </Box>
            </Radio>
        )
    };

    const renderAddresses = (): JSX.Element => {

        if (!userInfo?.addresses) {
            return <></>
        };

        return (
            <RadioGroup
            value={currentAddressIndex}
            onChange={handleClick}>
                {userInfo.addresses.map((v: AddressType, i) => {
                    return renderCheckBox(v, i);
                })}
            </RadioGroup>
        );
    };

    return (
        <Modal
        onClose={props.onClose}
        isOpen={props.isOpen}
        >
            <ModalOverlay />
            <ModalCloseButton />
            <ModalContent>
                <ModalHeader>Select an Address</ModalHeader>
                <Box
                paddingX='5%'>
                    {renderAddresses()}
                </Box>
                <ModalFooter>
                    <Box
                    display='flex'
                    flexDirection='row'
                    justifyContent='space-between'
                    w='100%'
                    >
                        <Button onClick={props.onClose}>Close</Button>
                        <Button onClick={props.onClose}>Submit</Button>
                    </Box>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}