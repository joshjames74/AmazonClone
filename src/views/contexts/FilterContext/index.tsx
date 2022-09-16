import React, { useState } from "react";
import JSXStyle from "styled-jsx/style";
import { FilterType } from "../../../types/Filter";

export const FilterContext = React.createContext<{
  selectedCategories: string[];
  setselectedCategories: (value: string[]) => void;
}>({
  selectedCategories: [],
  setselectedCategories: () => {},
});

export const FilterProvider = (props: {
  children?: JSX.Element;
}): JSX.Element => {
  const { children } = props;
  const [selectedCategories, setselectedCategories] = useState<string[]>([]);

  return (
    <FilterContext.Provider
      value={{
        selectedCategories: selectedCategories,
        setselectedCategories: setselectedCategories,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
