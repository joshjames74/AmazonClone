import { createSlice, Reducer } from "@reduxjs/toolkit";
import { Product } from "../../api/entities";
import { CardType } from "../../views/components/product/enums/CardType";

export interface QueryParams {
  query: string;
  categories: number[];
  priceMin: number;
  priceMax: number;
  reviewMin: number;
  start: number;
  end: number;
  filterType: FilterType;
}

export enum FilterType {
  NONE = "",
  PRICE_LOW_HIGH = "PRICE_LOW_HIGH",
  PRICE_HIGH_LOW = "PRICE_HIGH_LOW",
  RELEVANCE = "RELEVANCE",
  POPULARITY = "POPULARITY",
  REVIEW_SCORE = "REVIEW_SCORE",
}

interface ProductState {
  products: Product[];
  queryParams: QueryParams;
  filterType: FilterType;
  productCount: number;
  increment: number;
  cardType: CardType;
  pageNumber: number;
}

const defaultQueryParams: QueryParams = {
  query: "",
  categories: [0, 1, 2, 3],
  priceMin: 0,
  priceMax: 1000,
  reviewMin: 0,
  start: 0,
  end: 10,
  filterType: FilterType.NONE,
};

const initialState: ProductState = {
  products: [],
  queryParams: defaultQueryParams,
  filterType: FilterType.NONE,
  productCount: 0,
  increment: 10,
  cardType: CardType.wide,
  pageNumber: 1,
};

const productReducer: Reducer<ProductState, any> = (
  state = initialState,
  action
) => {
  console.log(state);
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_QUERY_PARAMS":
      return {
        ...state,
        queryParams: { ...state.queryParams, ...action.payload },
      };
    case "SET_PRODUCT_COUNT":
      return { ...state, productCount: action.payload };
    case "SET_INCREMENT":
      return { ...state, increment: action.payload };
    case "SET_CARD_TYPE":
      return { ...state, cardType: action.payload };
    case "SET_PAGE_NUMBER":
      return { ...state, pageNumber: action.payload };
    case "SET_FILTER_TYPE":
      return { ...state, filterType: action.payload };
    default:
      return state;
  }
};

export default productReducer;
