import { RangeFilterType } from "../../types/RangeFilterType";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Box,
} from "@chakra-ui/react";

export default function RangeFilter(props: RangeFilterType): JSX.Element {
  return (
    <Box w="100%" h="100%" display="flex" flexDirection="column">
      <Box w="100%" textAlign="center">
        {props.title}
      </Box>
      <RangeSlider
        min={props.min}
        max={props.max}
        step={props.step}
        onChangeEnd={props.onChange}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>
    </Box>
  );
}
