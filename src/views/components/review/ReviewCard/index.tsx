import { VStack, Box, Image, Button, Text } from "@chakra-ui/react";
import { ReviewType } from "../../../../types/Review";
import { UserInfo } from "../../../../types/UserInfo";
import { Review } from "../../../../api/entities";
import ReviewStars from "../../product/ProductCard/components/ReviewStars";
import RatingsOverview from "../RatingsOverview";
import { AuthContext, ProductContext, ThemeContext } from "../../../contexts";
import { useContext } from "react";
import { deleteReview } from "../../../../api/helpers/requests/review";
import { SettingsContext } from "../../../contexts/SettingsContext";

export default function ReviewCard(review: Review): JSX.Element {
  const { user } = useContext(AuthContext);
  const { theme } = useContext(ThemeContext);
  const { onUpdateReview } = useContext(ProductContext);
  const { defaultProfileImageURL } = useContext(SettingsContext);

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
      w="100%"
      maxH="25h"
      marginTop="5px"
    >
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        verticalAlign="middle"
        justifyContent="space-around"
        h="30%"
        maxH="10vh"
        w="100%"
        borderBottom="1px solid black"
        padding="3px"
      >
        <Box
          h="100%"
          w="100%"
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyItems="center"
        >
          <Image
            src={
              review.user.image_url
                ? review.user.image_url
                : defaultProfileImageURL
            }
            borderRadius={theme.sizes.borderRadius}
            marginRight="3px"
          />
          <Text fontWeight="500">{review.user.user_name}</Text>
        </Box>
        {renderDeleteButton()}
      </Box>
      <Box display="flex" flexDirection="row" w="100%" paddingX="5px">
        <ReviewStars {...reviewStarsProps} />
        <Text fontWeight="550" fontSize="md" marginLeft="3px">
          {review.title}
        </Text>
      </Box>
      <Text fontWeight="350" w="100%" paddingX="5px" fontSize="s">
        {review.content}
      </Text>
    </VStack>
  );
}
