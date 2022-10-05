import { RangeFilterType } from "../../types/RangeFilterType";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Box,
} from "@chakra-ui/react";

export default function RangeFilter(props: RangeFilterType): JSX.Element {
  console.log(props);
  return (
    <Box w="100%" h="100%" display="flex" flexDirection="column">
      <Box w="100%" textAlign="center">
        {props.title}
      </Box>
      <RangeSlider
        min={Number(props.min)}
        max={Number(props.max)}
        step={1}
        defaultValue={[Number(props.min), Number(props.max)]}
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
