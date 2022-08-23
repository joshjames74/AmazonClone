import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList, MenuItem, Button, Box } from '@chakra-ui/react';
import { LocationButtonType } from '../types/LocationButtonType';

export default function LocationButton(props: LocationButtonType): JSX.Element {

    return (
        <Menu>
            <MenuButton 
            as={Button}
            maxW='10vh'
            w='10%'
            fontSize='xs'
            p='0'
            marginRight='3px'
            >
                <Box
                display='flex'
                flexDirection='column'
                alignItems='center'>
                    {props.countryCode}
                    <ChevronDownIcon />
                </Box>
            </MenuButton>
            <MenuList>
                <MenuItem>
                    Change Location
                </MenuItem>
                <MenuItem>
                    Change Currency
                </MenuItem>
            </MenuList>
        </Menu>
    )
}