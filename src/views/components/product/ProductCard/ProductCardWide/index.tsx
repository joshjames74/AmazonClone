import { Box, Image, Text } from "@chakra-ui/react";
import ReviewStars from "../components/ReviewStars";
import { ReviewStarsProps } from "../components/ReviewStars";
import { Product } from "../../../../../api/entities";
import Link from "next/link";
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../../../contexts/SettingsContext";
import { ProductContext, UserContext } from "../../../../contexts";

export default function ProductCardWide(product: Product): JSX.Element {
  const { theme } = useContext(ThemeContext);
  const { base_url, getConvertedPrice } = useContext(SettingsContext);
  const { user } = useContext(UserContext);

  const [convertedPrice, setConvertedPrice] = useState<number>(0);

  useEffect(() => {
    if (product?.price && product?.currency && user?.currency) {
      getConvertedPrice(product.currency, product.price, user.currency).then(
        (res) => setConvertedPrice(res)
      );
    }
  }, [product, user]);

  const reviewStarsProps: ReviewStarsProps = {
    reviewScore: product.review_score,
    onColor: "teal",
    offColor: "black",
  };

  return (
    <Link href={`${base_url}/product/${product.product_id}`}>
      <Box
        display="flex"
        flexDirection="row"
        padding="5px"
        h="100px"
        borderRadius="lg"
        border={`2px solid ${theme.colors.product.border}`}
        fontSize="14px"
        w="100vh"
      >
        <Image
          src={product.image_url ? product.image_url : ""}
          alt={product.image_alt ? product.image_alt : ""}
          w='20vh'
        />
        <Box display="flex" flexDirection="column" h="100%" paddingX="3px">
          <Box h="25%" fontWeight="500">
            {product.title}
          </Box>
          <Box display="flex" flexDirection="row" alignItems="center" h="20%">
            <ReviewStars {...reviewStarsProps} />({product.review_count}{" "}
            Reviews)
          </Box>
          <Box h="20%" fontWeight="500" color="teal.600">
            {user ? user.currency.code : ""} {convertedPrice}
          </Box>
          <Box h="30%" w="100%">
            <Text fontSize="12px" noOfLines={2}>
              {product.description}
            </Text>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
