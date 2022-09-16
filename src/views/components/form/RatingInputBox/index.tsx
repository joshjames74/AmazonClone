import { FormLabel, Select, Box } from '@chakra-ui/react';

export interface IRatingInputBoxProps {
    label: string,
    placeholder: string,
    onChange: (event: any) => void,
    isInvalid?: boolean,
    isRequired?: boolean
};

export default function RatingInputBox(props: IRatingInputBoxProps): JSX.Element {

    const values = [0, 1, 2, 3, 4, 5];

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
                <Select
                isRequired={props.isRequired}
                h='100%'
                w='80%'
                placeholder={props.placeholder}
                onChange={props.onChange}
                errorBorderColor='red.300'
                isInvalid={props.isInvalid}>
                    {values.map((v, i) => {
                        return <option value={v} key={i}>{v}</option>
                    })}
                </Select>
        </Box>
    )
}