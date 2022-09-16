import { Box } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";

export type ReviewStarsProps = {
  reviewScore: number;
  onColor?: string;
  offColor?: string;
  height?: string;
  width?: string;
};

export default function ReviewStars(props: ReviewStarsProps): JSX.Element {
  return (
    <Box display="flex" alignItems="center">
      {Array(5)
        .fill("")
        .map((_, i) => (
          <StarIcon
            key={i}
            color={i < props.reviewScore ? "teal" : "black"}
            h={props.height}
            w={props.width}
          />
        ))}
    </Box>
  );
}
