import { Product } from "../../data-source";
import { CardType } from "../../views/components/product/enums/CardType";
import { FilterType, QueryParams } from "../reducers/product";

export const setProducts = (products: Product[]) => ({
  type: "SET_PRODUCTS" as const,
  payload: products,
});

export const setProductCount = (count: number) => ({
  type: "SET_PRODUCT_COUNT" as const,
  payload: count,
});

export const setQueryParams = (params: Partial<QueryParams>) => ({
  type: "SET_QUERY_PARAMS" as const,
  payload: params,
});

export const setIncrement = (increment: number) => ({
  type: "SET_INCREMENT" as const,
  payload: increment,
});

export const setCardType = (cardType: CardType) => ({
  type: "SET_CARD_TYPE" as const,
  payload: cardType,
});

export const setPageNumber = (pageNumber: number) => ({
  type: "SET_PAGE_NUMBER" as const,
  payload: pageNumber,
});

export const setFilterType = (filterType: FilterType) => ({
  type: "SET_FILTER_TYPE" as const,
  payload: filterType,
});

export type ProductActionTypes =
  | ReturnType<typeof setProducts>
  | ReturnType<typeof setQueryParams>
  | ReturnType<typeof setProductCount>
  | ReturnType<typeof setIncrement>
  | ReturnType<typeof setCardType>
  | ReturnType<typeof setPageNumber>
  | ReturnType<typeof setFilterType>;
