import { GridItem, Box, Button, Grid, Select } from "@chakra-ui/react";
import ProductCardCompact from "../ProductCard/ProductCardCompact";
import ProductCardWide from "../ProductCard/ProductCardWide";
import { CardType } from "../enums/CardType";
import { useContext, useEffect, useState } from "react";
import { getProductBySearch } from "../../../../api/helpers/requests/product";
import {
  setProductCount,
  setProducts,
  setIncrement,
  setCardType,
  setQueryParams,
  setPageNumber,
} from "../../../../redux/actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";
import { FilterType, QueryParams } from "../../../../redux/reducers/product";
import { ProductResponse } from "../../../../api/services/ProductService";
import { LANG } from "../../../../lang";
import { UserContext } from "../../../contexts";
import styles from "./index.module.css";
import theme from "./../../../../theme";


// !! FILE IS TOO LONG
export default function ProductCardWrapper(): JSX.Element {

  // define language
  const { language } = useContext(UserContext);
  const lang = LANG[language];

  // fetch redux data
  const dispatch = useDispatch();
  const products = useSelector(
    (state: RootState) => state.productReducer.products
  );
  const queryParams = useSelector(
    (state: RootState) => state.productReducer.queryParams
  );
  const productCount = useSelector(
    (state: RootState) => state.productReducer.productCount
  );
  const increment = useSelector(
    (state: RootState) => state.productReducer.increment
  );
  const cardType = useSelector(
    (state: RootState) => state.productReducer.cardType
  );
  const pageNumber = useSelector(
    (state: RootState) => state.productReducer.pageNumber
  );

  // set info for page toggling
  const pagesAvailable = 10;
  const [pageNumberLowerBound, setPageNumberLowerBound] = useState<number>(1);
  const pagesTotal: number = Math.ceil(productCount / increment);

  // load products and product count
  const fetchProducts = (params: QueryParams): void => {
    if (!params) { return }
    getProductBySearch(params).then((product_response: ProductResponse) => {
      dispatch(setProducts(product_response.products));
      dispatch(setProductCount(product_response.product_count));
    });
  };

  // initial load
  useEffect(() => {
    fetchProducts(queryParams);
  }, []);

  // on changing pagination parameters: fetch new data
  useEffect(() => {
    fetchProducts(queryParams);
  }, [queryParams.start, queryParams.end]);

  // on changing increment: set query params with new value and go to page 1
  useEffect(() => {
    dispatch(setQueryParams({ start: 0, end: increment }));
    incrementPage(1 - pageNumber, false);
  }, [increment]);

  // on changing non-pagination parameters: go to page 1 and fetch new data
  useEffect(() => {
    incrementPage(1 - pageNumber);
    fetchProducts(queryParams);
  }, [
    queryParams.categories,
    queryParams.query,
    queryParams.priceMax,
    queryParams.priceMax,
    queryParams.priceMin,
    queryParams.reviewMin,
    queryParams.filterType,
  ]);


  const incrementPage = (
    pageDifference: number,
    changeQueryParams: boolean = true
  ) => {

    // define key constants for pagination
    const newPageNumber = pageNumber + pageDifference;
    const upperBound = pageNumberLowerBound + pagesAvailable - 1;
    const centeringIncrement = Math.floor(pagesAvailable / 2);


    // decided where to place the page numbers

    // for page 1, we can only set the 1st page number at the start
    if (newPageNumber == 1) {
      setPageNumberLowerBound(1);
    }

    // if we have reached the end of the page number window, we set the lower bound
    // so that the new page will lie in the center of the page number window
    if (upperBound - newPageNumber == 0) {
      setPageNumberLowerBound(pageNumberLowerBound + centeringIncrement);
    }

    // if we are 1 away from the end of the page number window, shift across by 1
    if (upperBound - newPageNumber == 1) {
      setPageNumberLowerBound(pageNumberLowerBound + 1);
    }

    if (newPageNumber - pageNumberLowerBound == 1 && pageNumberLowerBound > 2) {
      setPageNumberLowerBound(pageNumberLowerBound - 2);
    }
    if (newPageNumber - pageNumberLowerBound == 0) {
      if (pageNumberLowerBound > centeringIncrement) {
        setPageNumberLowerBound(pageNumberLowerBound - centeringIncrement);
      } else if (pageNumberLowerBound > 1) {
        setPageNumberLowerBound(pageNumberLowerBound - 1);
      }
    }

    if (changeQueryParams) {
      const difference = pageDifference * increment;
      dispatch(
        setQueryParams({
          start: queryParams.start + difference,
          end: queryParams.end + difference,
        })
      );
    }

    dispatch(setPageNumber(newPageNumber));
  };

  const getPageNumbers = (): number[] => {
    return Array.from(
      { length: pagesAvailable },
      (_, index) => pageNumberLowerBound + index
    );
  };

  const handleChangeFilter = (event) => {
    var filterType = FilterType.NONE;
    switch (event.target.value) {
      case lang.PRICE_LOW_HIGH:
        filterType = FilterType.PRICE_LOW_HIGH;
        break;
      case lang.PRICE_HIGH_LOW:
        filterType = FilterType.PRICE_HIGH_LOW;
        break;
      case lang.RELEVANCE:
        filterType = FilterType.RELEVANCE;
        break;
      case lang.REVIEW_SCORE:
        filterType = FilterType.REVIEW_SCORE;
        break;
      case lang.POPULARITY:
        filterType = FilterType.POPULARITY;
        break;
    }
    dispatch(setQueryParams({ filterType: filterType }));
  };


  // render products into compact cards
  const cardWrapperCompact = (): JSX.Element => {
    return (
      <Grid className={styles.product_card_compact_container}>
        {products.map((v, i) => <GridItem><ProductCardCompact key={i} {...v} /></GridItem>)}
      </Grid>
    );
  };

  // render products into wide cards
  const cardWrapperWide = (): JSX.Element => {
    return (
      <Box display="flex" flexDirection="column" gap="5px">
        {products.map((v, i) => <ProductCardWide key={i} {...v} /> )}
      </Box>
    );
  };


  // render no product message
  const noProductMessage = (): JSX.Element => {
    return (<Box className={styles.no_product_wrapper}>{lang.NO_PRODUCTS_FOUND}</Box>);
  };

  // render products (either compact or wide cards)
  const renderBody = (cardType: CardType): JSX.Element => {
    if (cardType === CardType.compact) { return cardWrapperCompact() }
    if (cardType === CardType.wide) { return cardWrapperWide() }
    return <></>;
  };

  const onClick = (number: number): void => {
    incrementPage(number - pageNumber);
  };

  const pageNumberContainer = (number: number): JSX.Element => {
    const bgColor = pageNumber == number 
                  ? theme.colours.pagination.selected 
                  : theme.colours.pagination.unselected
    const isDisabled = pagesTotal 
                     ? number > pagesTotal 
                     : false
    return (
      <Button 
      onClick={() => onClick(number)}
      className={styles.page_number_wrapper}
      bgColor={bgColor} disabled={isDisabled}
      >
        {number}
      </Button>
    );
  };


  const onClickCardType = (cardType: CardType, results: number): void => {
    dispatch(setCardType(cardType));
    dispatch(setIncrement(results));
    dispatch(setQueryParams({ end: queryParams.start + results }));
  };

  
  const resultCountContainer = (): JSX.Element => {

    const lowerMargin = increment * (pageNumber - 1) + 1
    const upperMargin = Math.min(increment * pageNumber, productCount)
    const message = `${lang.SHOWING} ${lowerMargin} - ${upperMargin} 
                     ${lang.OF} ${productCount} ${lang.RESULTS}`

    return (<Box className={styles.result_count_container}>{message}</Box>)
  };

  const pages = getPageNumbers();

  return (
      <Box className={styles.page_container}>
        <Box className={styles.product_grid_wrapper}>
          {products?.length > 0 ? resultCountContainer() : <></>}
          <Box className={styles.product_grid_container}>
            <Select placeholder={lang.FILTER_BY} onClick={(event) => handleChangeFilter(event)}>
              <option>{lang.PRICE_LOW_HIGH}</option>
              <option>{lang.PRICE_HIGH_LOW}</option>
              <option>{lang.RELEVANCE}</option>
              <option>{lang.REVIEW_SCORE}</option>
              <option>{lang.POPULARITY}</option>
            </Select>
            <span>{lang.RESULTS_PER_PAGE}</span>
            <Box className={styles.results_buttons_container}>
              <Box as="button" onClick={() => onClickCardType(CardType.wide, 10)}>10</Box>
              <Box as="button" onClick={() => onClickCardType(CardType.compact, 30)}>30</Box>
            </Box>
          </Box>
        </Box>
        <Box className={styles.body_container}>
          {products?.length > 1 ? renderBody(cardType) : noProductMessage()}
        </Box>
        <Box className={styles.pagination_wrapper}>
          {pages.map((page) => pageNumberContainer(page))}
        </Box>
      </Box>
  );
}
