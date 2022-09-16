import RangeFilter from "../components/RangeFilter";
import { Box } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { RangeFilterType } from "../types/RangeFilterType";
import { CurrencyCode } from "../../../../types";
import CheckboxFilter from "../components/CheckboxFilter";
import { CheckboxFilterType } from "../types/CheckboxFilterType";
import { SettingsContext } from "../../../contexts/SettingsContext";

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
  const { categories } = useContext(SettingsContext);

  const [priceRange, setPriceRange] = useState<[number, number]>([
    props.minPrice,
    props.maxPrice,
  ]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const options = categories.map((v: string, i) => {
    return {
      value: v,
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
    min: props.minPrice,
    max: props.maxPrice,
    step: props.priceStep,
    title: "Select Price",
    onChange: setPriceRange,
    unit: props.currencyCode?.toString(),
  };

  useEffect(() => {
    console.log(selectedCategories);
    console.log(priceRange);
  }, [selectedCategories, priceRange]);

  return (
    <Box display="flex" flexDirection="column" w="200px">
      <Box textAlign="center" border="2px solid black" padding="3px">
        Filters
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        border="2px solid black"
        padding="3px"
      >
        <RangeFilter {...rangeFilterProps} />
        <Box display="flex" flexDirection="row" justifyContent="space-evenly">
          <Box>{props.currencyCode}</Box>
          <Box>
            {priceRange[0]} - {priceRange[1]}
          </Box>
        </Box>
      </Box>
      <Box border="2px solid black" padding="3px">
        <CheckboxFilter {...checkboxFilterProps} />
      </Box>
    </Box>
  );
}
