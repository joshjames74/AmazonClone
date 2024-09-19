import { RangeFilterType } from "../../types/RangeFilterType";
import {
  Box,
  Button,
  InputGroup,
  InputLeftAddon,
  Input,
  useMediaQuery,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { setQueryParams } from "../../../../../redux/actions/productActions";
import styles from "./index.module.css";
import { LANG } from "./../../../../../lang";
import { UserContext } from "../../../../contexts";

export default function PriceFilter(props: RangeFilterType): JSX.Element {

  const { language } = useContext(UserContext);
  const lang = LANG[language];

  const [display, setDisplay] = useState(false);

  const defaultMinPrice = 0;
  const defaultMaxPrice = 1000;

  const [minPrice, setMinPrice] = useState<number>(defaultMinPrice);
  const [maxPrice, setMaxPrice] = useState<number>(defaultMaxPrice);

  const dispatch = useDispatch();

  // on change whether window is larger than 800px, close the filter
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  useEffect(() => {
    setDisplay(false);
  }, [isLargerThan800]);

  const onClick = () => {
    setDisplay(!display);
  };

  const onChangePrice = (): void => {
    dispatch(
      setQueryParams({
        priceMin: parseInt(minPrice),
        priceMax: parseInt(maxPrice),
      })
    );
  };

  const onChangeMax = (event) => {
    var new_price = Math.max(minPrice + 1, parseFloat(event.target.value));
    setMaxPrice(new_price);
  };

  const onChangeMin = (event) => {
    var new_price = Math.min(maxPrice - 1, parseFloat(event.target.value));
    setMinPrice(new_price);
  };

  return (
    <Box className={styles.wrapper}>
      <Button className={styles.button_wrapper} onClick={onClick}>
        <Box className={styles.button_body_container}>
          {props.title}
          {display ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Box>
      </Button>
      <Box 
      className={styles.input_container} 
      display={display ? "flex" : "none"}
      >
        <InputGroup className={styles.input_group}>
          <InputLeftAddon className={styles.left_addon}>
            {lang.MIN}
          </InputLeftAddon>
          <Input
            paddingX="3px"
            type="number"
            placeholder={`${defaultMinPrice}`}
            defaultValue={minPrice}
            value={minPrice}
            onChange={onChangeMin}
          ></Input>
        </InputGroup>
        <InputGroup className={styles.input_group}>
          <InputLeftAddon className={styles.left_addon}>
            {lang.MAX}
          </InputLeftAddon>
          <Input
            paddingX="3px"
            type="number"
            placeholder={`${defaultMaxPrice}`}
            defaultValue={maxPrice}
            value={maxPrice}
            onChange={onChangeMax}
          ></Input>
        </InputGroup>
        <Button w="10%" onClick={() => onChangePrice()}>
          Go
        </Button>
      </Box>
    </Box>
  );
}
