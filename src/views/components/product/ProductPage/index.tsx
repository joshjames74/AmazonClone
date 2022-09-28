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
      <Box 
      w="100%"
      display='flex'
      flexDirection='column'>
        <Box display="flex" flexDirection="row" maxW="120vh">
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
