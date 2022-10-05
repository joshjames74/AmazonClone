import { Address } from "../../../../../../api/entities";
import {
  ModalFooter,
  Button,
  Box,
  Modal,
  ModalContent,
  ModalCloseButton,
  ModalOverlay,
  ModalHeader,
  FormControl,
  Input,
  FormLabel,
  InputLeftAddon,
  InputGroup,
  Select,
} from "@chakra-ui/react";
import { useContext, useEffect, useReducer } from "react";
import { UserContext } from "../../../../../contexts";
import { SettingsContext } from "../../../../../contexts/SettingsContext";
import { Country } from "../../../../../../api/entities";

type SetAddressModalType = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SetAddressModal(
  props: SetAddressModalType
): JSX.Element {
  const { countries } = useContext(SettingsContext);

  const renderAddresses = (): JSX.Element => {
    const handleSubmit = (event) => {
      console.log(event, "data");
    };

    const styles = {
      input: {
        width: "75%",
      },
      inputGroup: {
        width: "100%",
      },
      label: {
        width: "25%",
      },
    };

    let initalValues = {
      name: "",
      number: "",
      street: "",
      postcode: "",
      county: "",
    };

    return (
      <FormControl
        display="flex"
        flexDirection="column"
        onSubmit={handleSubmit}
      >
        <InputGroup>
          <Select>
            {countries?.length &&
              countries.map((country: Country, index) => {
                return (
                  <option value={country.name} key={index}>
                    {country.name}
                  </option>
                );
              })}
          </Select>
        </InputGroup>
        <Input type="submit" onClick={handleSubmit} />
      </FormControl>
    );
  };

  return (
    <Modal onClose={props.onClose} isOpen={props.isOpen}>
      <ModalOverlay />
      <ModalCloseButton />
      <ModalContent>
        <ModalHeader>Add an Address</ModalHeader>
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
