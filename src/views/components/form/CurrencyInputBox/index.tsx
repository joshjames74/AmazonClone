import {
  Input,
  FormLabel,
  Box,
  InputGroup,
  InputLeftAddon,
  Select,
} from "@chakra-ui/react";
import { Currency } from "../../../../api/entities/Currency";
import { useEffect, useState } from "react";
import { getAllCurrencies } from "../../../../api/helpers/requests/currency";

export interface ICurrencyInputBoxProps {
  onChangePrice: (event: any) => void;
  onChangeCurrency: (event: any) => void;
}

export default function CurrencyInputBox(
  props: ICurrencyInputBoxProps
): JSX.Element {
  const { onChangePrice, onChangeCurrency } = props;

  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [price, setPrice] = useState<number>();

  const getCurrencies = () => {
    getAllCurrencies().then((response: any) => {
      if (!response) {
        return;
      }
      setCurrencies(response);
    });
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  const renderCurrencies = (): JSX.Element[] => {
    return currencies.map((currency: Currency, index) => {
      return (
        <option key={index} value={JSON.stringify(currency)}>
          {currency.code}
        </option>
      );
    });
  };

  return (
    <Box display="flex" flexDirection="row">
      <InputGroup w="100%">
        <FormLabel w="20%">Price</FormLabel>
        <Box display="flex" w="80%" flexDirection="row">
          <InputLeftAddon>
            <Select onChange={onChangeCurrency}>{renderCurrencies()}</Select>
          </InputLeftAddon>
          <Input type="number" placeholder="0" onChange={onChangePrice} />
        </Box>
      </InputGroup>
    </Box>
  );
}
