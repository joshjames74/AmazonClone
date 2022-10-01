import { Box } from "@chakra-ui/react";
import Navigation from "../../navigation";
import ReviewListWrapper from "../../review/ReviewListWrapper";
import ProductCardFull from "../ProductCardFull";
import BasketCard from "../../basket/BasketCard";
import Footer from "../../footer";

export default function ProductPage(): JSX.Element {
  return (
    <Box>
      <Navigation />
      <Box w="100%" display="flex" flexDirection="column" padding="3px">
        <Box display="flex" flexDirection="row" h="30vh" w="100%" maxW="120vh">
          <ProductCardFull />
          <BasketCard />
        </Box>
        <ReviewListWrapper />
      </Box>
      {/* <Footer /> */}
    </Box>
  );
}
