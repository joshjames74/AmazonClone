import AccountButton from "./AccountButton";
import BasketButton from "./BasketButton";
import DeliveryButton from "./DeliveryButton";
import LocationButton from "./LocationButton";
import LogoWrapper from "./LogoWrapper";
import ReturnsButton from "./OrdersButton";
import SearchBar from "./SearchBar";
import { Box } from "@chakra-ui/react";
import { LogoWrapperType } from "./types/LogoWrapperType";

export default function Navigation(): JSX.Element {
  const logoWrapperProps: LogoWrapperType = {
    imageURL: "https://www.logodesign.net/logo/eye-and-house-5806ld.png",
  };

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
      <LogoWrapper {...logoWrapperProps} />
      <DeliveryButton />
      <SearchBar />
      <LocationButton />
      <AccountButton />
      <ReturnsButton />
      <BasketButton />
    </Box>
  );
}
