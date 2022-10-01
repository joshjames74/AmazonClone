import ReviewCard from "../ReviewCard";
import RatingsOverview from "../RatingsOverview";
import { Review } from "../../../../api/entities";
import { Box } from "@chakra-ui/react";
import { ProductContext } from "../../../contexts";
import { useContext } from "react";
import ReviewForm from "../../form/ReviewForm";

export default function ReviewListWrapper(): JSX.Element {
  const { reviews } = useContext(ProductContext);

  const emptyReview = () => {
    return (
      <Box
        w="100%"
        h="5vh"
        border="2px solid black"
        textAlign="center"
        borderRadius="10px"
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
    <Box display="flex" flexDirection="row" padding="3px" w="120vh">
      <RatingsOverview />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        paddingX="3px"
        w="100%"
      >
        <ReviewForm />
        {renderReviewsBox()}
      </Box>
    </Box>
  );
}
