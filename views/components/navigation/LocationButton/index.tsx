import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { LocationButtonType } from './types';

export default function LocationButton(props: LocationButtonType): JSX.Element {

    return (
        <Menu>
            <MenuButton>
                {props.countryCode} <ChevronDownIcon />
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