import React, { useEffect, useState } from "react";
import { Category, Country, Currency } from "../../../api/entities";
import {
  getAllCategories,
  getAllParentCategories,
} from "../../../api/helpers/requests/categories";
import { getAllCountries } from "../../../api/helpers/requests/countries";
import { convertCurrency } from "../../../api/helpers/requests/currency";
import { CurrencyCode } from "../../../types";

export const SettingsContext = React.createContext<{
  base_url: string;
  logoUrl: string;
  categories: Category[];
  parentCategories: Category[];
  defaultLocation: string;
  defaultCurrency: CurrencyCode;
  countries: Country[];
  loading: boolean;
  getConvertedPrice: (
    currency: Currency,
    value: number,
    newCurrency: Currency
  ) => Promise<number>;
}>({
  base_url: "",
  logoUrl: "",
  categories: [],
  parentCategories: [],
  defaultLocation: "US",
  defaultCurrency: CurrencyCode.USD,
  countries: [],
  loading: true,
  getConvertedPrice: null,
});

export const SettingsProvider = (props: { children?: JSX.Element }) => {
  const { children } = props;

  const base_url = "http://localhost:3000";
  const logoUrl = "https://www.logodesign.net/logo/eye-and-house-5806ld.png";
  const [categories, setCategories] = useState<Category[]>([]);
  const [parentCategories, setParentCategories] = useState<Category[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getConvertedPrice = (
    currency: Currency,
    value: number,
    newCurrency: Currency
  ): Promise<number> => {
    return convertCurrency(currency, value, newCurrency).then((res) => res);
  };

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
        logoUrl: logoUrl,
        categories: categories,
        parentCategories: parentCategories,
        defaultLocation: "US",
        defaultCurrency: CurrencyCode.GBP,
        countries: countries,
        loading: loading,
        getConvertedPrice: getConvertedPrice,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
