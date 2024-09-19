import {
  Modal,
  ModalContent,
  ModalHeader,
  Box,
  Select,
  Button,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import {
  putUserCountry,
  putUserCurrency,
} from "../../../../../api/helpers/requests/user";
import { Country, Currency } from "../../../../../data-source";
import { ProductListContext, UserContext } from "../../../../contexts";
import { SettingsContext } from "../../../../contexts/SettingsContext";

interface IChangeCountryModal {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangeCountryModal(props: IChangeCountryModal) {
  const { isOpen, onClose } = props;
  const { countries } = useContext(SettingsContext);
  const { user } = useContext(UserContext);

  const [selectedCountry, setSelectedCountry] = useState<number>();

  const renderCountries = (countries: Country[]) => {
    return countries.map((country: Country, index) => {
      return (
        <option key={index} value={country.country_id}>
          {country.code}
        </option>
      );
    });
  };

  const handleChange = (option) => {
    const country = countries.filter(
      (country) => country.country_id === parseInt(option.target.value)
    )[0];
    setSelectedCountry(country);
  };

  const handleSave = () => {
    putUserCountry(user.user_id, selectedCountry).then((res) => {
      onClose();
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent display="flex" flexDirection="column" padding="5px">
        <ModalHeader padding="5px" textAlign="center">
          Select Currency
        </ModalHeader>
        <Box>
          <Select onChange={handleChange}>
            {countries?.length ? renderCountries(countries) : <></>}
          </Select>
        </Box>
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="space-between"
          padding="5px"
        >
          <Button onClick={onClose}>Cancel</Button>
          <Button disabled={!!!selectedCountry} onClick={() => handleSave()}>
            Save
          </Button>
        </Box>
      </ModalContent>
    </Modal>
  );
}
