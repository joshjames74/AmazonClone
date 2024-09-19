import { Box, Button, useMediaQuery } from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import ReviewStars from "../../../product/ProductCard/components/ReviewStars";
import { PageContext } from "../../../../contexts/PageContext";
import { useDispatch, useSelector } from "react-redux";
import { setQueryParams } from "../../../../../redux/actions/productActions";
import { RootState } from "../../../../../redux/store/store";

export default function ReviewFilter(): JSX.Element {
  const [display, setDisplay] = useState<boolean>(false);

  const dispatch = useDispatch();
  const reviewMin = useSelector(
    (state: RootState) => state.productReducer.queryParams.reviewMin
  );

  // on change whether window is larger than 800px, close the filter
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  useEffect(() => {
    setDisplay(false);
  }, [isLargerThan800]);

  const onClick = () => {
    setDisplay(!display);
  };

  const onClickReview = (reviewMin) => {
    dispatch(setQueryParams({ reviewMin: reviewMin }));
  };

  return (
    <Box display="flex" flexDirection="column" w="100%" gap="5px" flexGrow={1}>
      <Button w="100%" textAlign="center" onClick={onClick}>
        <Box display="flex" flexDirection="row" alignItems="end">
          Review Score
          {display ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Box>
      </Button>
      <Box display={display ? "flex" : "none"} flexDirection="column" gap="5px">
        {[5, 4, 3, 2, 1, 0].map((value) => (
          <Box
            as="button"
            onClick={() => onClickReview(value)}
            display="flex"
            flexDirection="row"
            gap="3px"
            alignItems="center"
            justifyContent="left"
            textDecoration={value == reviewMin ? "underline" : ""}
          >
            <ReviewStars reviewScore={value} />
            <span>and up</span>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
