import { RangeFilterType } from "../../types/RangeFilterType";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Box,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

export default function RangeFilter(props: RangeFilterType): JSX.Element {
  const [display, setDisplay] = useState(true);

  const onClick = () => {
    setDisplay(!display);
  };

  return (
    <Box w="100%" display="flex" flexDirection="column">
      <Button w="100%" textAlign="center" onClick={onClick}>
        <Box display="flex" flexDirection="row" alignItems="end">
          {props.title}
          {display ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Box>
      </Button>
      <RangeSlider
        min={Number(props.min)}
        max={Number(props.max)}
        step={1}
        defaultValue={[Number(props.min), Number(props.max)]}
        display={display ? "" : "none"}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </Box>
  );
}
