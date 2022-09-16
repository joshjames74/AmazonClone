import { Box, FormLabel, Input, FormControl } from "@chakra-ui/react";

export interface IImageInputBoxProps {
  placeholder: string;
  multiple?: boolean;
  onChange: (event: any) => void;
  isInvalid: boolean;
  isRequired?: boolean;
}

export default function ImageInputBox(props: IImageInputBoxProps): JSX.Element {
  return (
    <Box display="flex" flexDirection="row">
      <FormLabel h="100%" w="20%">
        {props.placeholder}
      </FormLabel>
      <Input
        isRequired={props.isRequired}
        h="100%"
        w="80%"
        type="file"
        accept="image/png, image/jpeg"
        placeholder={props.placeholder}
        multiple={props.multiple}
        onChange={props.onChange}
        isInvalid={props.isInvalid}
      />
    </Box>
  );
}
