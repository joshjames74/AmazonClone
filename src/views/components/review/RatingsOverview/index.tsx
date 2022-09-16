import { Box } from "@chakra-ui/react";
import { useContext } from "react";
import { ProductContext } from "../../../contexts";
import ReviewStars from "../../product/ProductCard/components/ReviewStars";

export default function RatingsOverview(): JSX.Element {
  const { productInfo } = useContext(ProductContext);

  const renderStarGraph = (
    stars: number,
    count: number,
    key: number
  ): JSX.Element => {
    const percentage = Math.floor((count / productInfo.reviewCount) * 100);

    return (
      <Box
        display="flex"
        flexDirection="row"
        key={key}
        border="1px solid black"
        borderRadius="4px"
      >
        <Box w="20%">{stars} stars</Box>
        <Box w="60%" padding="1px" overflow="hidden" h="30%">
          <Box
            w={`${percentage ? percentage : 0}%`}
            h="100%"
            bgColor="yellow.400"
          ></Box>
          <Box
            w={`${percentage ? 100 - percentage : 0}%`}
            h="100%"
            bgColor="white"
          ></Box>
        </Box>
        <Box>{percentage ? percentage : 0} %</Box>
      </Box>
    );
  };

  const stars = [
    {
      value: 1,
      count: 5,
    },
    {
      value: 2,
      count: 7,
    },
    {
      value: 3,
      count: 1,
    },
    {
      value: 4,
      count: 1,
    },
    {
      value: 5,
      count: 10,
    },
  ];

  return (
    <Box
      display="flex"
      flexDirection="column"
      w="70%"
      maxW="50vh"
      border="1px solid black"
    >
      <Box display="flex" flexDirection="column" w="100%">
        <Box>
          <b>Customer Reviews</b>
        </Box>
        <Box display="flex" flexDirection="row" w="100%">
          <ReviewStars reviewScore={productInfo.reviewScore} />
          <Box marginLeft="5px">{productInfo.reviewScore} out of 5</Box>
        </Box>
        <Box>{productInfo.reviewCount} global ratings</Box>
      </Box>
      {stars.map((v, i) => {
        return renderStarGraph(v.value, v.count, i);
      })}
    </Box>
  );
}
