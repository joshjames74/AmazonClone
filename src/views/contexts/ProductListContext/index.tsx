import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../../api/helpers/requests/product";
import { CurrencyCode } from "../../../types";
import { Product } from "../../../api/entities";

export const ProductListContext = React.createContext<{
  productList: Product[];
}>({
  productList: [],
});

export const ProductListProvider = (props: {
  children?: JSX.Element;
}): JSX.Element => {
  const { children } = props;

  const [productList, setProductList] = useState<Product[]>([]);

  const getProducts = () => {
    getAllProducts().then((products: Product[]) => {
      if (!products) {
        return;
      }
      setProductList(products);
    });
    // getAllProductInfo().then((products: Product[]) => {
    //   console.log(products);
    //   if (!products) {
    //     return;
    //   }
    //   setProductList(products);
    // });
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductListContext.Provider
      value={{
        productList: productList,
      }}
    >
      {children}
    </ProductListContext.Provider>
  );
};
