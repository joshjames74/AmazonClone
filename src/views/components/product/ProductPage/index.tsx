"use-client";

import { Box } from "@chakra-ui/react";
import Navigation from "../../navigation";
import ReviewListWrapper from "../../review/ReviewListWrapper";
import ProductCardFull from "../ProductCardFull";
import BasketCard from "../../basket/BasketCard";
import RatingsOverview from "../../review/RatingsOverview";
import styles from "./index.module.css";


export default function ProductPage(): JSX.Element {

  return (
    <Box>
      <Navigation />
      <Box className={styles.wrapper}>
        <Box className={styles.product_wrapper}>
          <Box>
            <ProductCardFull />
            <Box className={styles.divider} />
            <Box className={styles.review_container} >
              <RatingsOverview />
              <ReviewListWrapper />
            </Box>
          </Box>
          <BasketCard />
        </Box>
      </Box>
    </Box>
  );
}
