import ReviewCard from "../ReviewCard";
import RatingsOverview from "../RatingsOverview";
import { Review } from "../../../../api/entities";
import { Box } from "@chakra-ui/react";
import { ProductContext, ThemeContext } from "../../../contexts";
import { useContext } from "react";
import ReviewForm from "../../form/ReviewForm";

export default function ReviewListWrapper(): JSX.Element {
  const { reviews } = useContext(ProductContext);
  const { theme } = useContext(ThemeContext);

  const emptyReview = () => {
    return (
      <Box
        w="100%"
        h="5vh"
        borderRadius={theme.sizes.borderRadius}
        borderWidth={theme.sizes.borderWidth}
        borderColor={theme.colors.primaryBorder}
        textAlign="center"
        justifyContent="center"
        justifyItems="center"
        alignItems="center"
        alignContent="center"
      >
        No reviews
      </Box>
    );
  };

  const renderReviews = () => {
    return reviews.map((v: Review, i) => {
      return <ReviewCard key={i} {...v} />;
    });
  };

  const renderReviewsBox = () => {
    return (
      <Box display="flex" flexDirection="column" w="100%">
        {reviews.length ? renderReviews() : emptyReview()}
      </Box>
    );
  };

  return (
    <Box display="flex" flexDirection="row" w="60%">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        //paddingX="3px"
        w="100%"
        gap="10px"
      >
        <ReviewForm />
        {renderReviewsBox()}
      </Box>
    </Box>
  );
}
