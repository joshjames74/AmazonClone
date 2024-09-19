import AccountButton from "./AccountButton";
import BasketButton from "./BasketButton";
import DeliveryButton from "./DeliveryButton";
import LocationButton from "./LocationButton";
import LogoWrapper from "./LogoWrapper";
import ReturnsButton from "./OrdersButton";
import SearchBar from "./SearchBar";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { LogoWrapperType } from "./types/LogoWrapperType";
import { useContext, useState } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import AddProductButton from "./AddProductButton";
import { ThemeContext } from "../../contexts";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Navigation(): JSX.Element {
  const { logoUrl } = useContext(SettingsContext);
  const { theme } = useContext(ThemeContext);
  const [hidden, setHidden] = useState(true);

  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  const onClick = () => {
    setHidden(!hidden);
  };

  const smallRender = (): JSX.Element => {
    return (
      <Box
      display="flex"
      flexDirection="column"
      // h="fit-content"
      h="60px"
      w="100%"
      padding="10px"
      bgColor={theme.colors.primaryAccent}
      gap="5px">
      <Box
        display="flex"
        flexDirection="row"
        
      >
        <Box 
        display="flex" 
        flexDirection="row"
        alignContent="left">
          <Button
          maxW="10vh"
          onClick={onClick} 
          display="flex" padding="0.3em">
            <HamburgerIcon fontSize="1.5em" />
          </Button>
          <Box
          display={hidden ? "none" : "flex"}
          flexDirection="row"
          gap="5px"
          bgColor={theme.colors.primaryAccent}
          paddingX="10px"
          paddingY="5px"
          >
                <DeliveryButton />
                <AddProductButton />
                <AccountButton />
                <ReturnsButton />
                <BasketButton />
          </Box>
        </Box>
        <SearchBar />
      </Box>
        
      </Box>
    );
  };

  return !isLargerThan800 ? (
    smallRender()
  ) : (
    <Box
      display="flex"
      flexDirection="row"
      alignContent="center"
      alignItems="center"
      minW="100vw"
      w="100%"
      paddingX="5px"
      paddingY="5px"
      h="60px"
      borderBottomWidth={theme.sizes.borderWidth}
      borderBottomColor={theme.colors.primaryBorder}
      bgColor={theme.colors.primaryAccent}
      gap="5px"
      overflow="auto"
    >
      <LogoWrapper imageUrl={logoUrl} />
      <DeliveryButton />
      <SearchBar />
      <AddProductButton />
      <LocationButton />
      <AccountButton />
      <ReturnsButton />
      <BasketButton />
    </Box>
  );
}
