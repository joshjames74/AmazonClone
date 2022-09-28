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

    // const useHandler = (state, action: any) => {
    //   let obj = {}
    //   obj[action.type] = action.payload.target.value;
    //   return obj;
    // };

    // const [state, dispatch] = useReducer(useHandler, initalValues);

    return (
      <FormControl
        display="flex"
        flexDirection="column"
        onSubmit={handleSubmit}
      >
        {/* {Object.keys(initalValues).map((name: string, index) => {
          return (
            <InputGroup style={styles.inputGroup} key={index}>
              <FormLabel for={name} style={styles.label}>{name}</FormLabel>
              <Input type='text' name={name} style={styles.input} onChange={(event) => dispatch({type: `${name}`, payload: event})}/>
            </InputGroup>
          )
        })} */}
        {/* <InputGroup style={styles.inputGroup}>
            <FormLabel for={'name'} style={styles.label}>{'name'}</FormLabel>
            <Input type='text' name={'name'} style={styles.input} onChange={(event) => dispatch({type: `${'name'}`, payload: event})}/>
        </InputGroup> */}
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
        {/* <InputGroup style={styles.inputGroup}>
          <FormLabel for='name' style={styles.label}>Name</FormLabel>
          <Input type='text' name='name' style={styles.input} onChange={(event) => dispatch({type: 'name', payload: event})}/>
        </InputGroup>
        <InputGroup style={styles.inputGroup}>
          <FormLabel for='number' style={styles.label}>Number</FormLabel>
          <Input type='text' name='number' style={styles.input} />
        </InputGroup>
        <InputGroup style={styles.inputGroup}>
          <FormLabel for='street' style={styles.label}>Street Name</FormLabel>
          <Input type='text' name='street' style={styles.input} />
        </InputGroup>
        <InputGroup style={styles.inputGroup}>
          <FormLabel for='postcode' style={styles.label}>Post Code</FormLabel>
          <Input type='text' name='postcode' style={styles.input} />
        </InputGroup>
        <InputGroup style={styles.inputGroup}>
          <FormLabel for='county' style={styles.label}>County</FormLabel>
          <Input type='text' name='county' style={styles.input} />
        </InputGroup> */}
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
