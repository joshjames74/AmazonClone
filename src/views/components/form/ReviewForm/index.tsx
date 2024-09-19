import { Box, Button, Input, Text, Textarea } from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { CurrencyCode, UserType } from "../../../../types";
import { AuthContext, ProductContext, ThemeContext } from "../../../contexts";
import InputBox from "../InputBox";
import { validateTitle, validateContent, validateRating } from "./Validation";
import RatingInputBox from "../RatingInputBox";
import { ReviewType } from "../../../../types/Review";
import { addReview } from "../../../../api/helpers/requests/review";
import { Review } from "../../../../api/entities";
import { ChevronDownIcon, PlusSquareIcon, StarIcon } from "@chakra-ui/icons";

export default function ReviewForm(): JSX.Element {
  const { user } = useContext(AuthContext);
  const { product, onUpdateReview } = useContext(ProductContext);
  const { theme } = useContext(ThemeContext);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [canSubmit, setCanSubmit] = useState<boolean>(true);
  const [visible, setVisible] = useState<boolean>(false);

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

  const handleReviewScore = (value: number) => {
    setRating(value);
  };

  const starColour = (value: number): string => {
    const colour = value <= rating ? "green" : "black";
    return colour;
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

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const LineBreak = (): JSX.Element => {
    return (
      <hr
        style={{
          borderColor: "lightgray",
          borderWidth: "2px",
        }}
      ></hr>
    );
  };

  return (
    <Box padding="8px" margin="0" w="100%">
      <Box textAlign="left">
        <Text
          display="flex"
          alignItems="center"
          fontSize="2xl"
          fontWeight={550}
        >
          Create Review
          <PlusSquareIcon
            marginLeft="10px"
            color={visible ? "teal.600" : ""}
            onClick={() => toggleVisibility()}
          />
        </Text>
      </Box>
      <Box
        display={visible ? "flex" : "none"}
        flexDirection="column"
        gap="10px"
      >
        <LineBreak />
        <Box display="flex" flexDirection="column">
          <Text fontSize="lg" fontWeight={550}>
            Overall Rating
          </Text>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            fontSize="xl"
          >
            {Array.from({ length: 5 }, (_, i) => {
              return (
                <StarIcon
                  onClick={() => handleReviewScore(i + 1)}
                  color={starColour(i + 1)}
                />
              );
            })}
          </Box>
        </Box>
        <LineBreak />
        <Box display="flex" flexDirection="column">
          <Text fontSize="lg" fontWeight={550}>
            Title
          </Text>
          <Input
            type="text"
            placeholder="Enter title..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            isInvalid={!validateTitle(title)}
          />
        </Box>
        <LineBreak />
        <Box display="flex" flexDirection="row">
          <Text fontSize="lg" fontWeight={550}>
            Content
          </Text>
        </Box>
        <Textarea
          value={content}
          placeholder="Enter content..."
          onChange={(event) => setContent(event.target.value)}
          isInvalid={!validateContent(content)}
          h="100px"
        />
        <LineBreak />
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
    </Box>
  );
}
