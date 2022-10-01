import AccountButton from "./AccountButton";
import BasketButton from "./BasketButton";
import DeliveryButton from "./DeliveryButton";
import LocationButton from "./LocationButton";
import LogoWrapper from "./LogoWrapper";
import ReturnsButton from "./OrdersButton";
import SearchBar from "./SearchBar";
import { Box } from "@chakra-ui/react";
import { LogoWrapperType } from "./types/LogoWrapperType";
import { useContext } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";

export default function Navigation(): JSX.Element {
  const { logoUrl } = useContext(SettingsContext);

  return (
    <Box
      display="flex"
      flexDirection="row"
      w="100%"
      h="50px"
      borderWidth="3px"
      borderColor="black"
      p="1px"
      bgColor={"#232f3e"}
    >
      <LogoWrapper imageUrl={logoUrl} />
      <DeliveryButton />
      <SearchBar />
      <LocationButton />
      <AccountButton />
      <ReturnsButton />
      <BasketButton />
    </Box>
  );
}
