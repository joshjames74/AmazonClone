import RangeFilter from "../components/RangeFilter";
import { Box, Button } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { RangeFilterType } from "../types/RangeFilterType";
import { CurrencyCode } from "../../../../types";
import CheckboxFilter from "../components/CheckboxFilter";
import { CheckboxFilterType } from "../types/CheckboxFilterType";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { Category } from "../../../../api/entities";
import { ProductListContext } from "../../../contexts";

type NavigationSidebarType = {
  minPrice: number;
  maxPrice: number;
  priceStep: number;
  currencyCode?: CurrencyCode;
  categories: string[];
};

export default function NavigationSidebar(
  props: NavigationSidebarType
): JSX.Element {
  const { parentCategories } = useContext(SettingsContext);
  const { productList } = useContext(ProductListContext);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (productList) {
      const maxPrice = Math.max(...productList.map(product => product.price))
      setPriceRange([0, maxPrice]);
    }
  }, []);
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const options = parentCategories.map((v: Category, i) => {
    return {
      value: v.name,
      isChecked: false,
    };
  });

  const onChangeOption = (option: any): void => {
    const value = option.target.defaultValue;

    if (selectedCategories.includes(value)) {
      setSelectedCategories(
        selectedCategories.filter((v, i) => {
          return v !== value;
        })
      );
    }
    if (!selectedCategories.includes(value)) {
      setSelectedCategories([...selectedCategories, value]);
    }
  };

  const handlePriceRangeChange = (value: [number, number]): void => {
    setPriceRange(value);
  };

  const checkboxFilterProps: CheckboxFilterType = {
    options: options,
    onChange: onChangeOption,
  };

  const rangeFilterProps: RangeFilterType = {
    min: priceRange[0],
    max: priceRange[1],
    step: props.priceStep,
    title: "Price",
    onChange: setPriceRange,
    unit: props.currencyCode?.toString(),
  };

  useEffect(() => {
    console.log(selectedCategories);
    console.log(priceRange);
  }, [selectedCategories, priceRange]);

  return (
    <Box 
    display="flex"
    flexDirection="column"
    padding='3px'
    border='2px solid black'
    borderRadius='4px'
    margin='3px'
    w="200px">
      <Box
      textAlign="center"
      padding="3px"
      border='1px solid gray'
      borderRadius='2px'
      marginY='1px'
      >
        Filters
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        padding="3px"
        border='1px solid gray'
        borderRadius='2px'
        marginY='1px'
      >
        <RangeFilter {...rangeFilterProps} />
        <Box 
        display="flex"
        flexDirection="row"
        justifyContent="space-evenly">
          <Box>{props.currencyCode}</Box>
          <Box>
            {priceRange[0]} - {priceRange[1]}
          </Box>
        </Box>
      </Box>
      <Box
      border='1px solid gray'
      borderRadius='2px'
      marginY='1px'
      padding="3px">
        <CheckboxFilter {...checkboxFilterProps} />
      </Box>
      <Button
      border='2px solid black'>
        Submit
      </Button>
    </Box>
  );
}
