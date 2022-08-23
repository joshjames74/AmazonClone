import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuList, MenuButton, Button, MenuItem } from '@chakra-ui/react';

export default function AccountButton(): JSX.Element {
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon w={6} h={6}/>}>
                My Account
            </MenuButton>
            <MenuList>
                <MenuItem>Orders</MenuItem>
                <MenuItem>Account</MenuItem>
                <MenuItem>Settings</MenuItem>
            </MenuList>
        </Menu>
    )
}