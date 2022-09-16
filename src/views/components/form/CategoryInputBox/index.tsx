import { FormLabel, Input, Box, InputGroup, InputLeftAddon, Select, Checkbox } from '@chakra-ui/react';
import { Currency } from '../../../../api/entities/Currency';
import { useEffect, useState } from 'react';
import { getAllCurrencies } from '../../../../api/helpers/requests/currency';

export interface ICategoryInputBox {
    // label: string,
    // type: string,
    // placeholder: string,
    categories: string[],
    onChange: (categories: string[]) => void,
    // isInvalid?: boolean,
    // isRequired?: boolean
};

export default function CategoryInputBox(props: ICategoryInputBox): JSX.Element {

    const { categories, onChange } = props;
    const [checkedCategories, setCheckedCategories] = useState<string[]>([]);

    const updateCategories = (isChecked: boolean, value: string) => {
        if (!isChecked) {
            setCheckedCategories([...checkedCategories, value])
        };
        if (isChecked) {
            setCheckedCategories(checkedCategories.filter(v => v !== value))
        }
    }

    useEffect(() => {
        onChange(checkedCategories);
    }, [checkedCategories]);

    const renderCategories = (): JSX.Element[] => {
        return categories.map((category: string, index) => {
            return (
            <Checkbox
            isChecked={checkedCategories.includes(category)}
            key={index}
            value={category}
            onChange={() => updateCategories(checkedCategories.includes(category), category)} >
                    {category}
            </Checkbox>
            )
        })
    }

    return (
        <Box
        display='flex'
        flexDirection='column'
        >
            {renderCategories()}
        </Box>
    )
}