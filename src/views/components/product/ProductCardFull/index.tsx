import { useContext } from "react";
import { ProductContext, UserContext } from "../../../contexts";
import { Box, Image } from "@chakra-ui/react";
import ReviewStars from "../ProductCard/components/ReviewStars";

export default function ProductCardFull(): JSX.Element {
  const { product } = useContext(ProductContext);
  const { currentAddress } = useContext(UserContext);

  return (
    <Box display="flex" flexDirection="row" h="100%" padding="3px" maxW="80vh">
      <Box w="50%" h="100%" border="2px solid black" borderRadius="10px">
        <Image src={product.image_url ? product.image_url : ""} />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        border="2px solid black"
        borderRadius="10px"
        w="50%"
        padding="3px"
        marginLeft="3px"
      >
        <Box>
          <b>{product.title}</b>
        </Box>
        <Box display="flex" flexDirection="row">
          <ReviewStars reviewScore={product.review_score} />
          &bull;
          <Box>{product.review_count} reviews</Box>
        </Box>
        <Box>
          {product.currency.code} {product.price}
        </Box>
        <Box>{product.description}</Box>
      </Box>
    </Box>
  );
}
