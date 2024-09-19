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
import Image from "next/image";
import NavigationButton from "../NavigationButton";

export default function LocationButton(): JSX.Element {
  const { user, loading } = useContext(UserContext);
  const defaultCountry = "US";

  const [showCurrencyModal, setShowCurrencyModal] = useState<boolean>(false);
  const [showCountryModal, setShowCountryModal] = useState<boolean>(false);

  const handleClick = () => {};

  return (
    <NavigationButton>
      <Menu>
        <MenuButton as={Button} maxW="12vh" fontSize="xs" p="0.3em">
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            maxW="4em"
          >
            <Box display="flex">
              <Image
                width="100%"
                height="100%"
                objectFit="contain"
                src={`https://flagsapi.com/${user?.country?.code}/flat/64.png`}
              />
            </Box>
            <Box w="fit-content" minW="1em">
              <ChevronDownIcon />
            </Box>
          </Box>
        </MenuButton>
        <MenuList>
          <MenuItem
            h="50%"
            textDecoration="underline"
            _hover={{ textColor: "blue", bgColor: "white" }}
            onClick={() => setShowCountryModal(!showCountryModal)}
          >
            Change Location ({user?.country?.code})
          </MenuItem>
          <ChangeCountryModal
            isOpen={showCountryModal}
            onClose={() => setShowCountryModal(false)}
          />
          <MenuItem
            textDecoration="underline"
            _hover={{ textColor: "blue", bgColor: "white" }}
            h="50%"
            onClick={() => setShowCurrencyModal(!showCurrencyModal)}
          >
            Change Currency ({user?.currency?.code})
          </MenuItem>
          <ChangeCurrencyModal
            isOpen={showCurrencyModal}
            onClose={() => setShowCurrencyModal(false)}
          />
        </MenuList>
      </Menu>
    </NavigationButton>
  );
}
