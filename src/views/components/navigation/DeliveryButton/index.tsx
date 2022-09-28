import { InfoIcon } from "@chakra-ui/icons";
import { Box, Button, ModalContent, propNames } from "@chakra-ui/react";
import { ClassNames } from "@emotion/react";
import { useState, useContext, useEffect } from "react";
import { createContext } from "react";
import { AddressType } from "../../../../types";
import SelectAddressModal from "./modals/SelectAddressModal";
import SetAddressModal from "./modals/SetAddressModal";
import { AuthContext, UserContext } from "../../../contexts";

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
        fontSize="10px"
        bgColor="blackAlpha.200"
        onClick={() => setShowSelectAddressModal(!showSelectAddressModal)}
      >
        <Box textAlign="left">Deliver to {currentAddress.name}</Box>
        <Box textAlign="left">{currentAddress.postcode}</Box>
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
    if (!isLoggedIn && currentAddress) {
      return <SelectAddressModal {...selectAddressModalProps} />;
    }
    if (isLoggedIn) {
      return <SetAddressModal {...selectAddressModalProps} />;
    }
    return <></>;
  };

  return (
    <Box
      className="deliver-button"
      display="flex"
      flexDirection="row"
      textColor="whiteAlpha.900"
      h="100%"
      w="8%"
      minW="20vh"
    >
      {isLoggedIn ? loggedInButton() : loggedOutButton()}
      {loading ? <></> : renderAddressModal()}
    </Box>
  );
}
