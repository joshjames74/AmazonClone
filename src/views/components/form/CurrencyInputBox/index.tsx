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
  // label: string,
  // type: string,
  // placeholder: string,
  onChangePrice: (event: any) => void;
  onChangeCurrency: (event: any) => void;
  // isInvalid?: boolean,
  // isRequired?: boolean
}

export default function CurrencyInputBox(
  props: ICurrencyInputBoxProps
): JSX.Element {
  const { onChangePrice, onChangeCurrency } = props;

  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [price, setPrice] = useState<number>();

  const getCurrencies = () => {
    getAllCurrencies().then((response: any) => {
      if (!response.data.currencies) {
        return;
      }
      setCurrencies(response.data.currencies);
    });
  };

  useEffect(() => {
    getCurrencies();
  }, []);

  const renderCurrencies = (): JSX.Element[] => {
    return currencies.map((currency: Currency, index) => {
      console.log(JSON.stringify(currency));
      return (
        <option key={index} value={JSON.stringify(currency)}>
          {currency.code}
        </option>
      );
    });
  };

  return (
    <Box display="flex" flexDirection="row">
      <InputGroup w='100%'>
        <FormLabel w='20%'>Price</FormLabel>
        <Box 
        display='flex'
        w='80%'
        flexDirection='row'>
          <InputLeftAddon>
            <Select onChange={onChangeCurrency}>
              {renderCurrencies()}
              {/* <option>GBP</option> */}
            </Select>
          </InputLeftAddon>
          <Input type="number" placeholder='0' onChange={onChangePrice} />
        </Box>
      </InputGroup>
    </Box>
  );
}
