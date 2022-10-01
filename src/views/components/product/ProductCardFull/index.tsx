import { useContext, useEffect, useState } from "react";
import { ProductContext, ThemeContext, UserContext } from "../../../contexts";
import { Box, Image, Text } from "@chakra-ui/react";
import ReviewStars from "../ProductCard/components/ReviewStars";
import { SettingsContext } from "../../../contexts/SettingsContext";

export default function ProductCardFull(): JSX.Element {
  const { product } = useContext(ProductContext);
  const { getConvertedPrice } = useContext(SettingsContext);
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  const [convertedPrice, setConvertedPrice] = useState<number>(0);

  useEffect(() => {
    if (product?.price && product?.currency && user?.currency) {
      console.log(user);
      getConvertedPrice(product.currency, product.price, user.currency).then(
        (res) => setConvertedPrice(res)
      );
    }
  }, [product, user]);

  return (
    <Box
      display="flex"
      flexDirection="row"
      h="100%"
      w="100%"
      maxW="80vh"
      border={`2px solid ${theme.colors.product.border}`}
      borderRadius="10px 0 0 10px"
      overflow="hidden"
    >
      <Box w="50%" h="100%" overflow="hidden">
        <Image src={product.image_url ? product.image_url : ""} h="100%" />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
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
        <Box fontWeight="500" color={theme.colors.product.border}>
          {user ? user.currency.code : ""} {convertedPrice}
        </Box>
        <Text>{product.description}</Text>
      </Box>
    </Box>
  );
}
