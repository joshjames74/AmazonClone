import { Box, Button } from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { CurrencyCode, UserType } from "../../../../types";
import { AuthContext, ProductContext } from "../../../contexts";
import InputBox from "../InputBox";
import { validateTitle, validateContent, validateRating } from "./Validation";
import RatingInputBox from "../RatingInputBox";
import { ReviewType } from "../../../../types/Review";
import { addReview } from "../../../../api/helpers/requests/review";
import { Review } from "../../../../api/entities";

export default function ReviewForm(): JSX.Element {
  const { user } = useContext(AuthContext);
  const { product, onUpdateReview } = useContext(ProductContext);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [canSubmit, setCanSubmit] = useState<boolean>(true);

  useEffect(() => {
    setCanSubmit(
      validateTitle(title) && validateContent(content) && validateRating(rating)
    );
  }, [title, content, rating]);

  const resetFields = () => {
    setTitle("");
    setContent("");
    setRating(0);
  };

  const handleSubmit = () => {
    // Create new review
    const review: Review = new Review();
    review.user = user;
    review.product = product;
    review.score = rating;
    review.title = title;
    review.content = content;
    review.image_urls = "";
    review.date = new Date();

    addReview(review).then((response) => {
      onUpdateReview();
      resetFields();
    });
  };

  return (
    <Box w="100%" border="2px solid black" padding="5px" borderRadius="10px">
      <InputBox
        label="Title"
        type="text"
        placeholder="Enter title..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        isInvalid={!validateTitle(title)}
      />

      <InputBox
        label="Content"
        type="text"
        value={content}
        placeholder="Enter content..."
        onChange={(event) => setContent(event.target.value)}
        isInvalid={!validateContent(content)}
      />

      <RatingInputBox
        label="Rating"
        value={rating}
        placeholder="0"
        onChange={(event) => setRating(event.target.value)}
        isInvalid={!validateRating(rating)}
      />

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        marginTop="3px"
      >
        <Button onClick={() => resetFields()}>Cancel</Button>
        <Button disabled={!canSubmit} type="submit" onClick={handleSubmit}>
          Add
        </Button>
      </Box>
    </Box>
  );
}
