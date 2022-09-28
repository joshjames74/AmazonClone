import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
} from "@chakra-ui/react";
import { LocationButtonType } from "../types/LocationButtonType";
import { UserContext } from "../../../contexts";
import { useContext } from "react";

export default function LocationButton(): JSX.Element {
  const { user, loading } = useContext(UserContext);
  const defaultCountry = "US";

  return (
    loading && (
      <Menu>
        <MenuButton
          as={Button}
          maxW="10vh"
          w="10%"
          fontSize="xs"
          p="0"
          marginRight="3px"
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            {user?.country?.code ? user.country.code : defaultCountry}
            <ChevronDownIcon />
          </Box>
        </MenuButton>
        <MenuList>
          <MenuItem>Change Location ({user?.country?.code})</MenuItem>
          <MenuItem>Change Currency ({user?.currency?.code})</MenuItem>
        </MenuList>
      </Menu>
    )
  );
}
