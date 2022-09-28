import React, { useEffect, useState } from "react";
import { Category, Country } from "../../../api/entities";
import {
  getAllCategories,
  getAllParentCategories,
} from "../../../api/helpers/requests/categories";
import { getAllCountries } from "../../../api/helpers/requests/countries";
import { CurrencyCode } from "../../../types";

export const SettingsContext = React.createContext<{
  base_url: string;
  categories: Category[];
  parentCategories: Category[];
  defaultLocation: string;
  defaultCurrency: CurrencyCode;
  countries: Country[];
  loading: boolean;
}>({
  base_url: '',
  categories: [],
  parentCategories: [],
  defaultLocation: "US",
  defaultCurrency: CurrencyCode.USD,
  countries: [],
  loading: true,
});

export const SettingsProvider = (props: { children?: JSX.Element }) => {
  const { children } = props;

  const base_url = 'http://localhost:3000';
  const [categories, setCategories] = useState<Category[]>([]);
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getAllParentCategories().then((res) => setParentCategories(res));
    getAllCategories().then((res) => setCategories(res));
    getAllCountries().then((res) => {
      setCountries(res);
    });
    setLoading(false);
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        base_url: base_url,
        categories: categories,
        parentCategories: parentCategories,
        defaultLocation: "US",
        defaultCurrency: CurrencyCode.GBP,
        countries: countries,
        loading: loading,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
