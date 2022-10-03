import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Box,
} from "@chakra-ui/react";
import { UserContext } from "../../../contexts";
import { useContext, useState } from "react";
import ChangeCurrencyModal from "./modals/ChangeCurrencyModal";
import ChangeCountryModal from "./modals/ChangeCountryModal";

export default function LocationButton(): JSX.Element {
  const { user, loading } = useContext(UserContext);
  const defaultCountry = "US";

  const [showCurrencyModal, setShowCurrencyModal] = useState<boolean>(false);
  const [showCountryModal, setShowCountryModal] = useState<boolean>(false);

  const handleClick = () => {
    
  }

  return (
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
          <MenuItem
          as={Button}
          onClick={() => setShowCountryModal(!showCountryModal)}>
            Change Location ({user?.country?.code})
          </MenuItem>
          <ChangeCountryModal 
          isOpen={showCountryModal}
          onClose={() => setShowCountryModal(false)}/>
          <MenuItem
          as={Button}
          onClick={() => setShowCurrencyModal(!showCurrencyModal)}>
            Change Currency ({user?.currency?.code})
          </MenuItem>
          <ChangeCurrencyModal 
          isOpen={showCurrencyModal}
          onClose={() => setShowCurrencyModal(false)}/>
        </MenuList>
      </Menu>
  );
}
