import { Box, filter, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { ProductContext } from "../../../contexts";
import ReviewStars from "../../product/ProductCard/components/ReviewStars";
import { Review } from "../../../../api/entities";

export default function RatingsOverview(): JSX.Element {
  const { product, reviews } = useContext(ProductContext);

  const renderStarGraph = (
    score: number,
    percentage: number,
    key: number
  ): JSX.Element => {
    return (
      <Box
        display="flex"
        flexDirection="row"
        key={key}
        bgColor="gray.300"
        h="4vh"
        w="100%"
        padding="2px"
      >
        <Box w="30%">
          <ReviewStars reviewScore={score} />{" "}
        </Box>
        <Box
          w={`${percentage ? percentage : 0}%`}
          bgColor="yellow.300"
          borderRadius="3px"
        />
        <Box w={`${percentage ? 100 - percentage : 100}%`} borderRadius="3px" />
        <Text w="30%" textAlign="right">
          {percentage ? percentage : 0}%
        </Text>
      </Box>
    );
  };

  const renderGraphs = () => {
    const maxScore = 5;
    let graphs = [];
    for (let i = 0; i <= maxScore; i++) {
      const filteredReviews = reviews.filter((review) => {
        return review.score === i;
      });
      const percentage =
        filteredReviews.length > 0
          ? Math.floor((filteredReviews.length / reviews.length) * 100)
          : 0;
      const graph = renderStarGraph(i, percentage, i);
      graphs.push(graph);
    }
    return graphs;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      w="70%"
      h="100%"
      maxW="50vh"
      bgColor="gray.200"
      padding="3px"
      border="2px solid black"
      borderRadius="10px"
    >
      <Box display="flex" flexDirection="column" w="100%">
        <Text fontWeight="500">Customer Reviews</Text>
        <Box display="flex" flexDirection="row" w="100%">
          <ReviewStars reviewScore={product.review_score} />
          <Text marginLeft="5px" fontWeight="350">
            {Math.round(Number(product.review_score))} out of 5
          </Text>
        </Box>
        <Text fontWeight="400">{product.review_count} global ratings</Text>
      </Box>
      <Box h="30%">{renderGraphs()}</Box>
    </Box>
  );
}
