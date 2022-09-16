import { FormLabel, Input, Box } from '@chakra-ui/react';

export interface IInputBoxProps {
    label: string,
    type: string,
    placeholder: string,
    onChange: (event: any) => void,
    isInvalid?: boolean,
    isRequired?: boolean
};

export default function ImageBox(props: IInputBoxProps): JSX.Element {

    return (
        <Box
        display='flex'
        flexDirection='row'
        >
                <FormLabel
                h='100%'
                w='20%'>
                    {props.label}
                </FormLabel>
                <Input
                isRequired={props.isRequired}
                h='100%'
                w='80%'
                type={props.type}
                placeholder={props.placeholder}
                onChange={props.onChange}
                errorBorderColor='red.300'
                isInvalid={props.isInvalid}
                />
        </Box>
    )
}