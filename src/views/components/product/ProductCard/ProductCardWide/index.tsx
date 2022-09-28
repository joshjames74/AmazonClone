import { Box, Image } from "@chakra-ui/react";
import ReviewStars from "../components/ReviewStars";
import { ReviewStarsProps } from "../components/ReviewStars";
import { Product } from "../../../../../api/entities";
import Link from 'next/link';
import { ThemeContext } from "../../../../contexts/ThemeContext";
import { useContext } from 'react';
import { SettingsContext } from "../../../../contexts/SettingsContext";

export default function ProductCardWide(product: Product): JSX.Element {

  const { theme } = useContext(ThemeContext); 
  const { base_url } = useContext(SettingsContext);

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
        fontSize='14px'
        w='80vh'
      >
        <Image
          src={product.image_url ? product.image_url : ""}
          alt={product.image_alt ? product.image_alt : ""}
          h="100%"
        />
        <Box 
        display="flex"
        flexDirection="column"
        h='100%'
        paddingX='3px'>
          <Box
          h='20%'>{product.title}</Box>
          <Box 
          display="flex"
          flexDirection="row"
          alignItems='center'
          h='30%'>
            <ReviewStars {...reviewStarsProps} />
            ({product.review_count} Reviews)
          </Box>
          <Box
          h='20%'>
            {product.currency.code} {product.price}
          </Box>
          <Box
          h='30%'
          w='100%'
          overflow='hidden'
          textOverflow='ellipsis'>{product.description}</Box>
        </Box>
      </Box>
    </Link>
  );
}
