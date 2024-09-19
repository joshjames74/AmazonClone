import { InfoIcon } from "@chakra-ui/icons";
import { Box, Button, ModalContent, propNames, Text } from "@chakra-ui/react";
import { ClassNames } from "@emotion/react";
import { useState, useContext, useEffect } from "react";
import { createContext } from "react";
import { AddressType } from "../../../../types";
import SelectAddressModal from "./modals/SelectAddressModal";
import SetAddressModal from "./modals/SetAddressModal";
import { AuthContext, UserContext } from "../../../contexts";
import NavigationButton from "../NavigationButton";

export default function DeliveryButton(): JSX.Element {
  const { isLoggedIn } = useContext(AuthContext);
  const { currentAddress, loading } = useContext(UserContext);

  const [showSelectAddressModal, setShowSelectAddressModal] =
    useState<boolean>(false);

  const loggedInButton = () => {
    if (!currentAddress) {
      return;
    }

    return (
      <Button
        display="flex"
        flexDirection="column"
        padding="5px"
        onClick={() => setShowSelectAddressModal(!showSelectAddressModal)}
      >
        <Box
          display="flex"
          flexDirection="row"
          textAlign="left"
          fontSize="xs"
          gap="0.3em"
        >
          Deliver to
          <Text overflow="hidden" textOverflow="ellipsis" w="5em">
            {currentAddress.name}
          </Text>
        </Box>
        <Box fontSize="xs">
          {currentAddress.county} {currentAddress.postcode}
        </Box>
      </Button>
    );
  };

  const loggedOutButton = () => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        padding="5px"
        fontSize="10px"
        onClick={() => setShowSelectAddressModal(!showSelectAddressModal)}
      >
        <Box>Hello</Box>
        <b>
          <InfoIcon /> Select your address
        </b>
      </Box>
    );
  };

  const selectAddressModalProps = {
    isOpen: showSelectAddressModal,
    onClose: () => setShowSelectAddressModal(false),
  };

  const renderAddressModal = (): JSX.Element => {
    if (isLoggedIn && currentAddress) {
      return <SelectAddressModal {...selectAddressModalProps} />;
    }
    if (!isLoggedIn) {
      return <SetAddressModal {...selectAddressModalProps} />;
    }
    return <></>;
  };

  return (
    <NavigationButton>
      <Box>
        {isLoggedIn ? loggedInButton() : loggedOutButton()}
        {loading ? <></> : renderAddressModal()}
      </Box>
    </NavigationButton>
  );
}
