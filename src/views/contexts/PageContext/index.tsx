import { useRouter } from "next/router";
import React, { useState } from "react";
import { Category, Product } from "../../../api/entities";
import {
  getProductBySearch,
  getProductCountBySearch,
} from "../../../api/helpers/requests/product";
import { CardType } from "../../components/product/enums/CardType";
import Router from "next/router";

export type QueryType = {
  query: string;
  categories: number[];
  reviewMin: number;
  priceMin: number;
  priceMax: number;
  start: number;
  end: number;
  increment: number;
  pageNumber: number;
  cardType: CardType;
};

export const PageContext = React.createContext<{
  query: string;
  setQuery: (any) => void;
  categories: Category[];
  setCategories: (any) => void;
  reviewMin: number;
  setReviewMin: (any) => void;
  priceMin: number;
  setPriceMin: (any) => void;
  priceMax: number;
  setPriceMax: (any) => void;
  products: Product[];
  productCount: number;
  incrementPage: (any) => void;
  increment: number;
  setIncrement: (any) => void;
  pageNumber: number;
  totalPages: number;
  loading: boolean;
  cardType: CardType;
  setCardType: (any) => void;
  setRouterArgument: (any) => Promise<boolean>;
  loadPage: () => void;
}>({
  query: "",
  setQuery: () => null,
  categories: [
    {
      name: "",
      children: [],
      category_id: 0,
      parent: null,
    },
  ],
  setCategories: () => null,
  reviewMin: 0,
  setReviewMin: () => null,
  priceMin: 0,
  setPriceMin: () => null,
  priceMax: 1000000,
  setPriceMax: () => null,
  products: [
    {
      product_id: 1,
      seller: null,
      title: "",
      url: "",
      description: "",
      image_url: "",
      image_alt: "",
      price: 0,
      currency: {
        currency_id: 1,
        code: "GBP",
        symbol: "$",
        gbp_exchange_rate: 1,
      },
      review_score: 0,
      review_count: 0,
    },
  ],
  productCount: 1,
  incrementPage: () => null,
  pageNumber: 0,
  loading: false,
  totalPages: 1,
  increment: 10,
  setIncrement: () => null,
  cardType: CardType.wide,
  setCardType: () => null,
  setRouterArgument: () => null,
  loadPage: () => null,
});

export const PageProvider = (props: { children?: JSX.Element }) => {
  const { children } = props;
  const router = useRouter();

  // set search parameters
  const [query, setQuery] = useState<string>("");
  const [categories, setCategories] = useState<number[]>([]);
  const [reviewMin, setReviewMin] = useState<number>(0);
  const [priceMin, setPriceMin] = useState<number>(0);
  const [priceMax, setPriceMax] = useState<number>(1000000);
  const [products, setProducts] = useState<Product[]>();
  const [start, setStart] = useState<number>(0);
  const [end, setEnd] = useState<number>(10);
  const [queryParams, setQueryParams] = useState<any>();

  // set loading
  const [loading, setLoading] = useState<boolean>(false);

  // set number of results per page and page number
  const [productCount, setProductCount] = useState<number>(1);
  const [increment, setIncrement] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(5);
  const [cardType, setCardType] = useState<CardType>(CardType.wide);

  //
  const [urlParams, setUrlParams] = useState<any>({
    query: "",
    categories: [1],
    reviewMin: 0,
    priceMin: 0,
    priceMax: 1000,
    start: 0,
    end: 10,
    increment: 0,
    pageNumber: 1,
    cardType: CardType.wide,
  });

  const getTotalPages = (increment: number, productCount: number): number => {
    /**
     * Computes total number of pages required to display all results.
     *
     * @param {number} increment     Number of results per page
     * @param {number} productCount  Total number of products
     *
     * @return {number}              Total number of pages to view all products
     */
    return Math.ceil(productCount / increment);
  };

  const incrementPage = (num_pages: number): void => {
    if (start + increment * num_pages < 0) {
      throw new Error("out of range");
    }
    setStart(start + increment * num_pages);
    setEnd(end + increment * num_pages);
    setPageNumber(pageNumber + num_pages);
  };

  // set variables on first load
  const loadData = (props: QueryType) => {
    if (!props) {
      return;
    }
    const {
      query,
      categories,
      reviewMin,
      priceMin,
      priceMax,
      start,
      end,
      increment,
    } = props;
    setLoading(true);
    getProductCountBySearch(
      query,
      categories,
      reviewMin,
      priceMin,
      priceMax,
      start,
      end
    ).then((res) => {
      setProductCount(res);
    });
    setTotalPages(getTotalPages(increment, productCount));
    getProductBySearch(
      query,
      categories,
      reviewMin,
      priceMin,
      priceMax,
      start,
      end
    ).then((res) => {
      setProducts(res);
      setLoading(false);
    });
  };

  const setRouterArgument = (new_query): Promise<boolean> => {
    

    const old_query = {
      query: query,
      categories: categories.toString(),
      reviewMin: reviewMin,
      priceMin: priceMin,
      priceMax: priceMax,
      start: start,
      end: end,
      increment: increment,
      pageNumber: pageNumber,
      cardType: cardType,
    };

    return Router.push({
      pathname: "",
      query: { ...new_query },
    });
  };

  const setRouter = (): Promise<boolean> => {
    /**
     * Pushes page parameters to the router
     */

    return Router.push({
      pathname: "",
      query: {
        query: query,
        categories: categories.toString(),
        reviewMin: reviewMin,
        priceMin: priceMin,
        priceMax: priceMax,
        start: start,
        end: end,
        increment: increment,
        pageNumber: pageNumber,
        cardType: cardType,
      },
    });
  };

  const parseUrlParams = (props: any): QueryType => {
    /**
     * Parses all items from QueryType object from string into the correct format
     *
     * @param    any        props     QueryType object but all items are string types
     * @returns  QueryType            QueryType object with all items as correct datatypes
     */

    var parameters = {
      query: null,
      categories: null,
      reviewMin: null,
      priceMin: null,
      priceMax: null,
      start: null,
      end: null,
      increment: null,
      pageNumber: null,
      cardType: null,
    };

    parameters["query"] = props.query;
    parameters["categories"] = props.categories
      ? props.categories.split(",")
      : [];

    // parse and validate reviewMin
    const reviewMin_parsed = parseInt(props.reviewMin);
    if (reviewMin_parsed < 0 || reviewMin_parsed > 5) {
      throw new Error(`Cannot parse reviewMin. (value: ${props.reviewMin})`);
    }
    parameters["reviewMin"] = reviewMin_parsed;
;
    // parse and validate priceMin and priceMax
    const priceMin_parsed = parseInt(props.priceMin);
    const priceMax_parsed = parseInt(props.priceMax);
    parameters["priceMin"] = priceMin_parsed;
    parameters["priceMax"] = priceMax_parsed;

    // parse and validate start, end, and increment
    const start_parsed = parseInt(props.start);
    const end_parsed = parseInt(props.end);
    const increment_parsed = parseInt(props.increment);
    const pageNumber_parsed = parseInt(props.pageNumber);

    if (start_parsed < 0 || increment_parsed == 0) {
      throw new Error(
        `Cannot parse start or end or increment or pageNumber. (value: ${[
          props.start,
          props.end,
          props.increment,
          props.pageNumber,
        ]})`
      );
    }
    parameters["start"] = start_parsed;
    parameters["end"] = end_parsed;
    parameters["increment"] = increment_parsed;
    parameters["pageNumber"] = pageNumber_parsed;
    parameters["cardType"] = CardType.wide;

    return parameters;
  };

  return (
    <PageContext.Provider
      value={{
        query: query,
        setQuery: setQuery,
        categories: categories,
        setCategories: setCategories,
        reviewMin: reviewMin,
        setReviewMin: setReviewMin,
        priceMin: priceMin,
        setPriceMin: setPriceMin,
        priceMax: priceMax,
        setPriceMax: setPriceMax,
        products: products,
        productCount: productCount,
        incrementPage: incrementPage,
        increment: increment,
        setIncrement: setIncrement,
        pageNumber: pageNumber,
        loading: loading,
        totalPages: totalPages,
        cardType: cardType,
        setCardType: setCardType,
        setRouterArgument: setRouterArgument,
        loadPage: loadData2,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
