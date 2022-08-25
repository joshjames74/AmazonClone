import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList, MenuItem, Button, Box } from '@chakra-ui/react';
import { LocationButtonType } from '../types/LocationButtonType';
import { UserContext } from '../../../contexts';
import { useContext } from 'react';

export default function LocationButton(props: LocationButtonType): JSX.Element {

    const { userInfo } = useContext(UserContext);
    const defaultCountry = 'US';

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
                    {userInfo.countryCode ? userInfo.countryCode : defaultCountry}
                    <ChevronDownIcon />
                </Box>
            </MenuButton>
            <MenuList>
                <MenuItem>
                    Change Location ({userInfo.countryCode})
                </MenuItem>
                <MenuItem>
                    Change Currency ({userInfo.currencyCode})
                </MenuItem>
            </MenuList>
        </Menu>
    )
}