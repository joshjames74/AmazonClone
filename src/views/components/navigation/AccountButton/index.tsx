import { ChevronDownIcon } from "@chakra-ui/icons";
import { Menu, MenuList, MenuButton, Button, MenuItem } from "@chakra-ui/react";
import { AccountButtonType } from "../types/AccountButton";
import { AuthContext } from "../../../contexts";
import { useContext } from "react";

export default function AccountButton(props: AccountButtonType): JSX.Element {
  const { isLoggedIn } = useContext(AuthContext);

  const loggedInButton = (): JSX.Element => {
    return (
      <Menu>
        <MenuButton
          as={Button}
          href={props.accountURL ? props.accountURL : ""}
          rightIcon={<ChevronDownIcon />}
          fontSize="xs"
          w="15%"
          maxW="20vh"
          paddingX="2px"
          marginRight="3px"
        >
          My Account
        </MenuButton>
        <MenuList fontSize="xs">
          <MenuItem>Orders</MenuItem>
          <MenuItem>Account</MenuItem>
          <MenuItem>Settings</MenuItem>
        </MenuList>
      </Menu>
    );
  };

  const loggedOutButton = (): JSX.Element => {
    return <Button>Log in</Button>;
  };

  const renderBody = (): JSX.Element => {
    if (isLoggedIn) {
      return loggedInButton();
    }
    if (!isLoggedIn) {
      return loggedOutButton();
    }
    return <></>;
  };

  return renderBody();
}
