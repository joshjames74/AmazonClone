import { Address } from "../../../../../../api/entities";
import {
  Radio,
  ModalFooter,
  Button,
  Box,
  RadioGroup,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  ModalHeader,
} from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { UserContext } from "../../../../../contexts";

type SelectAddressModalType = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SelectAddressModal(
  props: SelectAddressModalType
): JSX.Element {
  const { addresses, currentAddressIndex, setCurrentAddressIndex, loading } =
    useContext(UserContext);

  const handleClick = (nextVal: string) => {
    // Convert next val to number as the
    // radio group onChange function argument
    // is of type string
    if (isNaN(nextVal as any)) {
      return;
    }

    const key: number = parseInt(nextVal);

    if (!addresses || !setCurrentAddressIndex) {
      return;
    }
    if (key < 0 || key > addresses.length) {
      return;
    }

    setCurrentAddressIndex(key);
  };

  const renderCheckBox = (address: Address, key: number): JSX.Element => {
    return (
      <Radio value={key} key={key}>
        <Box display="flex" flexDirection="row">
          <Box>
            <b>{address.name}: </b>
            {address.county}, {address.postcode}
          </Box>
        </Box>
      </Radio>
    );
  };

  const renderAddresses = (): JSX.Element => {
    if (!addresses) {
      return <></>;
    }

    return (
      <RadioGroup
        value={currentAddressIndex}
        onChange={handleClick}
        display="flex"
        flexDirection="column"
      >
        {addresses.map((v: Address, i) => {
          return renderCheckBox(v, i);
        })}
      </RadioGroup>
    );
  };

  return (
    <Modal onClose={props.onClose} isOpen={props.isOpen}>
      <ModalOverlay />
      <ModalCloseButton />
      <ModalContent>
        <ModalHeader>Select an Address</ModalHeader>
        <Box paddingX="5%">{renderAddresses()}</Box>
        <ModalFooter>
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            w="100%"
          >
            <Button onClick={props.onClose}>Close</Button>
            <Button onClick={props.onClose}>Submit</Button>
          </Box>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
