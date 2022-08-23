import { ChevronDownIcon } from '@chakra-ui/icons';
import { Menu, MenuList, MenuButton, Button, MenuItem } from '@chakra-ui/react';
import { AccountButtonType } from '../types/AccountButton';

export default function AccountButton(props: AccountButtonType): JSX.Element {

    const loggedInButton = (): JSX.Element => {
        return (<Menu>
            <MenuButton
            as={Button}
            href={props.accountURL ? props.accountURL : ''}
            rightIcon={<ChevronDownIcon />}
            fontSize='xs'
            w='15%'
            maxW='20vh'
            pX='2px'
            marginRight='3px'>
                My Account
            </MenuButton>
            <MenuList fontSize='xs'>
                <MenuItem>Orders</MenuItem>
                <MenuItem>Account</MenuItem>
                <MenuItem>Settings</MenuItem>
            </MenuList>
        </Menu>)
    }

    const loggedOutButton = (): JSX.Element => {
        return (<Button>Log in</Button>)
    }

    const renderBody = (): JSX.Element => {
        if (props.isLoggedIn) {
            return loggedInButton();
        };
        if (!props.isLoggedIn) {
            return loggedOutButton();
        }
        return <></>
    }

    return renderBody();
}