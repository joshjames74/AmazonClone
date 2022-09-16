import { useContext } from "react";
import { ReviewType } from "../../../../types/Review";
import {
  ProductContext,
  ProductProvider,
} from "../../../contexts/ProductContext";
import { Box } from "@chakra-ui/react";
import Navigation from "../../navigation";
import ReviewListWrapper from "../../review/ReviewListWrapper";
import ProductCardFull from "../ProductCardFull";
import BasketCard from "../../basket/BasketCard";
import Footer from "../../footer";

export default function ProductPage(): JSX.Element {
  const { productInfo, reviewList } = useContext(ProductContext);

  const reviewListWrapperProps = {
    reviewList: reviewList,
    averageRating: productInfo.reviewScore,
    totalReviews: productInfo.reviewCount,
  };

  return (
    <Box>
      <Navigation />
      <Box w="100%">
        <Box display="flex" flexDirection="row">
          <Box w="70%">
            <ProductCardFull />
          </Box>
          <Box w="30%">
            <BasketCard />
          </Box>
        </Box>
        <ReviewListWrapper />
      </Box>
      <Footer />
    </Box>
  );
}
