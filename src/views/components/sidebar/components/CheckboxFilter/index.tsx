import { Checkbox, CheckboxGroup, Box } from "@chakra-ui/react";
import { CheckboxFilterType, OptionType } from "../../types/CheckboxFilterType";

export default function CheckboxFilter(props: CheckboxFilterType): JSX.Element {
  const renderCheckbox = (option: OptionType, key: number): JSX.Element => {
    return (
      <Checkbox
        value={option.value}
        key={key}
        onChange={props.onChange}
        isChecked={option.isChecked}
      >
        {option.value}
      </Checkbox>
    );
  };

  return (
    <Box display="flex" flexDirection="column">
      <CheckboxGroup>
        {props.options.map((v: OptionType, i) => {
          return renderCheckbox(v, i);
        })}
      </CheckboxGroup>
    </Box>
  );
}
