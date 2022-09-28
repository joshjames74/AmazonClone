import { VStack, Box, Image, Button } from "@chakra-ui/react";
import { ReviewType } from "../../../../types/Review";
import { UserInfo } from "../../../../types/UserInfo";
import { Review } from "../../../../api/entities";
import ReviewStars from "../../product/ProductCard/components/ReviewStars";
import RatingsOverview from "../RatingsOverview";
import { AuthContext, ProductContext } from "../../../contexts";
import { useContext } from "react";
import { deleteReview } from "../../../../api/helpers/requests/review";

export default function ReviewCard(review: Review): JSX.Element {
  const { user } = useContext(AuthContext);
  const { onUpdateReview } = useContext(ProductContext);

  const reviewStarsProps = {
    onColor: "black",
    offColor: "teal",
    reviewScore: review.score,
  };

  const renderImages = () => {
    if (!review.image_urls || review.image_urls.length === 0) {
      return;
    }

    // Render images here
  };

  const ratingOverviewProps = {
    averageRating: 3.5,
    totalReviews: 25,
  };

  const deleteHandler = () => {
    deleteReview(review).then((res) => {
      onUpdateReview();
    });
  };

  const renderDeleteButton = () => {
    const userHasPermission = user.user_id === review.user.user_id;
    return (
      userHasPermission && (
        <Button onClick={deleteHandler} h="100%">
          Delete
        </Button>
      )
    );
  };

  return (
    <VStack
      border="2px solid black"
      borderRadius="10px"
      w="100%"
      maxH="25h"
      marginTop="5px"
    >
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-around"
        h="30%"
        maxH="10vh"
        w="100%"
        borderBottom="1px solid black"
        padding="3px"
      >
        <Box h="100%" w="100%" display="flex" flexDirection="row">
          <Image
            src={review.user.image_url ? review.user.image_url : ""}
            w="10%"
            h="100%"
            borderRadius="100%"
            bgColor="blue.500"
            marginRight="3px"
          />
          <Box>{review.user.user_name}</Box>
        </Box>
        {renderDeleteButton()}
      </Box>
      <Box display="flex" flexDirection="row" w="100%" paddingX="5px">
        <ReviewStars {...reviewStarsProps} />
        <Box>
          <b>{review.title}</b>
        </Box>
      </Box>
      <Box w="100%" padding="3px">
        {review.content}
      </Box>
    </VStack>
  );
}
