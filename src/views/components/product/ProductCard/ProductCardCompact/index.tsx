import { Box, Image } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Link from "next/link";
import ReviewStars from "../components/ReviewStars";
import { ReviewStarsProps } from "../components/ReviewStars";
import { Product } from "../../../../../api/entities";

export default function ProductCardCompact(product: Product): JSX.Element {
  const reviewStarsProps: ReviewStarsProps = {
    reviewScore: product.review_score,
    onColor: "teal",
    offColor: "black",
  };

  return (
    <Link href={product.url ? product.url : ""}>
      <Box
        overflow="hidden"
        borderWidth="3px"
        borderRadius="lg"
        borderColor="teal.500"
        padding="3px"
        width="100px"
        height="150px"
        fontFamily="Helvetica"
        display="flex"
        flexDirection="column"
        alignContent="center"
      >
        <Image
          h="50%"
          src={product.image_url ? product.image_url : "#"}
          alt={product.image_alt ? product.image_alt : ""}
        ></Image>
        <Box h="50%">
          <Box display="flex" flexDirection="column">
            <Box textColor="blue" fontSize="xs" h="20%">
              <a href={product.url ? product.url : "/"}>{product.title}</a>
            </Box>
            <Box h="20%">{`${product.currency} ${product.price}`}</Box>
            <Box display="flex" flexDirection="column" h="25%" w="100%">
              <ReviewStars {...reviewStarsProps} />
              <Box>{`${product.review_count} reviews`}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Link>
  );
}
