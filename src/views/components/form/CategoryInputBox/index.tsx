import { Box, FormLabel, Checkbox } from "@chakra-ui/react";
import { useEffect, useState, useContext } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { Category } from "../../../../api/entities";

export interface ICategoryInputBox {
  categories?: string[];
  onChange: (categories: string[]) => void;
}

export default function CategoryInputBox(
  props: ICategoryInputBox
): JSX.Element {
  const { onChange } = props;
  const { parentCategories, loading } = useContext(SettingsContext);
  const [checkedCategories, setCheckedCategories] = useState<string[]>([]);

  const updateCategories = (isChecked: boolean, value: string) => {
    if (!isChecked) {
      setCheckedCategories([...checkedCategories, value]);
    }
    if (isChecked) {
      setCheckedCategories(checkedCategories.filter((v) => v !== value));
    }
  };

  useEffect(() => {
    onChange(checkedCategories);
  }, [checkedCategories]);

  const renderCategories = (categories: Category[]): JSX.Element[] => {
    return categories.map((category: Category, index) => {
      return (
        <div key={index}>
          <Checkbox
            isChecked={checkedCategories.includes(category.name)}
            key={index}
            value={category.name}
            onChange={() =>
              updateCategories(
                checkedCategories.includes(category.name),
                category.name
              )
            }
          >
            {category.name}
          </Checkbox>
          {category.children ? renderCategories(category.children) : <></>}
        </div>
      );
    });
  };

  return (
    <Box display="flex" flexDirection="row">
      <FormLabel w="20%">Categories</FormLabel>
      <Box display="flex" flexDirection="column">
        {loading ? <></> : renderCategories(parentCategories)}
      </Box>
    </Box>
  );
}
