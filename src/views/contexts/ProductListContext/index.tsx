import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getAllProducts, getProductBySearch } from "../../../api/helpers/requests/product";
import { CurrencyCode } from "../../../types";
import { Category, Product } from "../../../api/entities";

export const ProductListContext = React.createContext<{
  productList: Product[];
  search: (query: string, categories: Category[]) => void;
  reload: () => void;
}>({
  productList: [],
  search: null,
  reload: null,
});

export const ProductListProvider = (props: {
  children?: JSX.Element;
}): JSX.Element => {
  const { children } = props;

  const router = useRouter();
  const { query, categories } = router.query

  const [productList, setProductList] = useState<Product[]>([]);

  const getProducts = () => {
    getAllProducts().then((products: Product[]) => {
      if (!products) {
        return;
      }
      setProductList(products);
    });
  };

  const search = (query: string, categories: Category[]) => {
    getProductBySearch(query, categories).then(res => {
      setProductList(res);
    })
  }

  const getSearch = () => {
    if (query || categories) {
      search(query, categories);
    }
    if (!query && !categories) {
      getProducts();
    }
  }

  useEffect(() => {
    getSearch();
  }, [query, categories]);

  return (
    <ProductListContext.Provider
      value={{
        productList: productList,
        search: search,
        reload: getSearch
      }}
    >
      {children}
    </ProductListContext.Provider>
  );
};
