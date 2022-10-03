import React, { useEffect, useState } from "react";
import { Category, Country, Currency } from "../../../api/entities";
import {
  getAllCategories,
  getAllParentCategories,
} from "../../../api/helpers/requests/categories";
import { getAllCountries } from "../../../api/helpers/requests/countries";
import { convertCurrency, getAllCurrencies } from "../../../api/helpers/requests/currency";
import { CurrencyCode } from "../../../types";

export const SettingsContext = React.createContext<{
  base_url: string;
  logoUrl: string;
  currencies: Currency[];
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
  reload: () => void;
}>({
  base_url: "",
  logoUrl: "",
  currencies: null,
  categories: [],
  parentCategories: [],
  defaultLocation: "US",
  defaultCurrency: CurrencyCode.USD,
  countries: [],
  loading: true,
  getConvertedPrice: null,
  reload: null
});

export const SettingsProvider = (props: { children?: JSX.Element }) => {
  const { children } = props;

  const base_url = "http://localhost:3000";
  const logoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkTRwAG3-4fMnkD4sDjfEhoRKF4JxD2i1E947ptvT3&s";
  const [currencies, setCurrencies] = useState<Currency[]>([]);
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

  const fetchData = () => {
    getAllParentCategories().then((res) => setParentCategories(res));
    getAllCategories().then((res) => {
      console.log(res);
      setCategories(res)
    });
    getAllCountries().then((res) => {
      setCountries(res);
    });
    getAllCurrencies().then((res) => setCurrencies(res));
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        base_url: base_url,
        logoUrl: logoUrl,
        currencies: currencies,
        categories: categories,
        parentCategories: parentCategories,
        defaultLocation: "US",
        defaultCurrency: CurrencyCode.GBP,
        countries: countries,
        loading: loading,
        getConvertedPrice: getConvertedPrice,
        reload: fetchData,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
