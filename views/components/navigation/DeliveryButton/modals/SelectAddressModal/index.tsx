import { AddressType } from '../../../../../../types';
import { Checkbox, Box, CheckboxGroup } from '@chakra-ui/react';
import { useState } from 'react';

type SelectAddressModalType = {
    hidden: boolean;
    addresses: AddressType[]
    currentAddressIndex: number;
}

export default function SelectAddressModal(props: SelectAddressModalType): JSX.Element {

    const [currentAddressIndex, setCurrentAddressIndex] = useState<number>(props.currentAddressIndex)

    // const addressBox = (address: AddressType, key: number): JSX.Element => {

    //     return (
    //         <Checkbox isChecked={key === currentAddressIndex}>
    //             <Box display='flex' flexDirection='column'>
    //                 <Box>{props.addresses[key]}</Box>
    //             </Box>
    //         </Checkbox>
    //     )
    // }

    return (
        <Box hidden={props.hidden}>
            <CheckboxGroup>
                
            </CheckboxGroup>
        </Box>
    )
}