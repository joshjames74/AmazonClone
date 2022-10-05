import RangeFilter from "../components/RangeFilter";
import { Box, Button } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { RangeFilterType } from "../types/RangeFilterType";
import { CurrencyCode } from "../../../../types";
import CheckboxFilter from "../components/CheckboxFilter";
import { CheckboxFilterType } from "../types/CheckboxFilterType";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { Category } from "../../../../api/entities";
import { ProductListContext, UserContext } from "../../../contexts";
import { convertCurrency } from "../../../../api/helpers/requests/currency";

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
  const { parentCategories, categories } = useContext(SettingsContext);
  const { productList } = useContext(ProductListContext);
  const { user } = useContext(UserContext);

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    if (productList) {
      const maxPrice = productList.length ? Math.max(...productList.map((product) => product.price)) : 0;
      setPriceRange([0, maxPrice]);
    }
  }, []);

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const options = parentCategories.map((v: Category, i) => {
    return {
      value: v.name,
      isChecked: false,
    };
  });

  const onChangeOption = (categoryIds: number[]): void => {
    const selectedCategoriesModels = categories.filter(category => {
      return categoryIds.includes(category.category_id);
    })
    setSelectedCategories(selectedCategoriesModels);
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
    max: Math.round(priceRange[1]),
    step: props.priceStep,
    title: "Price",
    onChange: null,
    unit: props.currencyCode?.toString(),
  };

  useEffect(() => {
    console.log(selectedCategories);
    console.log(priceRange);
  }, [selectedCategories, priceRange]);

  return (
    <></>
  );
}
