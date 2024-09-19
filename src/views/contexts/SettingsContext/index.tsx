import React, { useEffect, useState } from "react";
import { Category, Country, Currency } from "../../../api/entities";
import {
  getAllCategories,
  getAllCategoriesTree,
  getAllParentCategories,
  getMostPopularCategories,
} from "../../../api/helpers/requests/categories";
import { getAllCountries } from "../../../api/helpers/requests/countries";
import {
  convertCurrency,
  getAllCurrencies,
} from "../../../api/helpers/requests/currency";
import { CurrencyCode } from "../../../types";

export const SettingsContext = React.createContext<{
  base_url: string;
  logoUrl: string;
  defaultImageURL: string;
  defaultProfileImageURL: string;
  currencies: Currency[];
  categories: Category[];
  categoriesTrees: Category[];
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
  defaultImageURL: "",
  currencies: null,
  categories: [],
  categoriesTrees: [],
  parentCategories: [],
  defaultLocation: "US",
  defaultCurrency: CurrencyCode.USD,
  defaultProfileImageURL: "",
  countries: [],
  loading: true,
  getConvertedPrice: null,
  reload: null,
});

export const SettingsProvider = (props: { children?: JSX.Element }) => {
  const { children } = props;

  const base_url = "http://localhost:3000";
  const logoUrl =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkTRwAG3-4fMnkD4sDjfEhoRKF4JxD2i1E947ptvT3&s";
  const defaultImageURL =
    "https://media.istockphoto.com/id/1354776457/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=w3OW0wX3LyiFRuDHo9A32Q0IUMtD4yjXEvQlqyYk9O4=";
  const defaultProfileImageURL =
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png";
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesTrees, setCategoriesTrees] = useState<Category[]>([]);
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
    getAllCountries().then((res) => {
      setCountries(res);
    });
    getAllCurrencies().then((res) => setCurrencies(res));
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        base_url: base_url,
        logoUrl: logoUrl,
        defaultImageURL: defaultImageURL,
        currencies: currencies,
        categories: categories,
        categoriesTrees: categoriesTrees,
        parentCategories: parentCategories,
        defaultLocation: "US",
        defaultCurrency: CurrencyCode.GBP,
        defaultProfileImageURL: defaultProfileImageURL,
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
