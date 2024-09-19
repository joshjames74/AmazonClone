import { Box, filter, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { ProductContext, ThemeContext } from "../../../contexts";
import ReviewStars from "../../product/ProductCard/components/ReviewStars";
import { Review } from "../../../../api/entities";

export default function RatingsOverview(): JSX.Element {
  const { product, reviews } = useContext(ProductContext);
  const { theme } = useContext(ThemeContext);

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
        h="4vh"
        w="100%"
        padding="2px"
        verticalAlign="middle"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box w="30%" marginRight="5px">
          <ReviewStars reviewScore={score} />{" "}
        </Box>
        <Box
          w={`${percentage ? percentage : 0}%`}
          bgColor="yellow.300"
          borderLeftRadius={theme.sizes.borderRadius}
          height="30%"
        />
        <Box
          w={`${percentage ? 100 - percentage : 100}%`}
          borderRightRadius={theme.sizes.borderRadius}
          bgColor="gray.200"
          height="30%"
        />
        <Text w="30%" textAlign="right" fontFamily={theme.fonts.primaryFont}>
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
      w="40%"
      h="100%"
      fontFamily={theme.fonts.primaryFont}
    >
      <Box display="flex" flexDirection="column">
        <Text fontWeight="550" fontSize="xl">
          Customer Reviews
        </Text>
        <Box
          display="flex"
          flexDirection="row"
          w="100%"
          verticalAlign="middle"
          alignItems="center"
        >
          <ReviewStars reviewScore={product.review_score} />
          <Text marginLeft="5px" fontWeight="450" fontSize="lg">
            {Math.round(Number(product.review_score))} out of 5
          </Text>
        </Box>
        <Text>{product.review_count} global ratings</Text>
      </Box>
      <Box
        h="30%"
      >
        {renderGraphs()}
      </Box>
    </Box>
  );
}
