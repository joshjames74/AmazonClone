import { ChevronDownIcon } from "@chakra-ui/icons";
import { Checkbox, CheckboxGroup, Box } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { Category } from "../../../../../api/entities";
import { SettingsContext } from "../../../../contexts/SettingsContext";
import { CheckboxFilterType, OptionType } from "../../types/CheckboxFilterType";

export default function CheckboxFilter(props: CheckboxFilterType): JSX.Element {
  const { parentCategories, loading } = useContext(SettingsContext);
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [categoriesTrees] = useContext(SettingsContext);
  const [showChildren, setShowChildren] = useState<number[]>([]);

  const getChildrenCategories = (category: Category): Category[] => {
    let categoriesList: Category[] = [];
    if (category?.children?.length) {
      category.children.forEach((child: Category) => {
        categoriesList.push(child);
        categoriesList.push(...getChildrenCategories(child));
      });
    }
    return categoriesList;
  };

  const getCategoriesFlat = (): Category[] => {
    let categoriesList: Category[] = [];
    for (const category of parentCategories) {
      categoriesList.push(category);
      categoriesList.push(...getChildrenCategories(category));
    }
    return categoriesList;
  };

  const findIsIndeterminate = (category: Category) => {
    return (
      category?.children?.some((child: Category) => {
        return selectedCategories.includes(child.category_id);
      }) &&
      category?.children?.some((child: Category) => {
        return !selectedCategories.includes(child.category_id);
      })
    );
  };

  const findIsChecked = (category: Category) => {
    if (selectedCategories.includes(category.category_id)) {
      return true;
    }
    if (category?.children?.length) {
      return category?.children?.every((value: Category) => {
        return selectedCategories.includes(value.category_id);
      });
    }
    return false;
  };

  const onChange = (event: any): void => {
    const id = parseInt(event?.target?.defaultValue);
    if (!id) {
      return;
    }

    const category = getCategoriesFlat().find((value: Category) => {
      return value.category_id === id;
    });

    if (selectedCategories.includes(id)) {
      if (category?.children) {
        const childrenIds = getChildrenCategories(category).map(
          (v) => v.category_id
        );
        setSelectedCategories(
          selectedCategories.filter((value: number) => {
            return !childrenIds.includes(value) && value !== id;
          })
        );
      }
      if (!category?.children) {
        setSelectedCategories(
          selectedCategories.filter((value: number) => {
            return value !== id;
          })
        );
      }
    } else {
      const childrenIds = getChildrenCategories(category).map(
        (v) => v.category_id
      );
      childrenIds.length > 0
        ? setSelectedCategories([...selectedCategories, ...childrenIds, id])
        : setSelectedCategories([...selectedCategories, id]);
    }
  };

  const handleSetChild = (category: Category) => {
    if (showChildren.includes(category.category_id)) {
      setShowChildren(
        showChildren.filter((value: number) => {
          return value !== category.category_id;
        })
      );
    } else {
      setShowChildren([...showChildren, category.category_id]);
    }
  };

  useEffect(() => {
    props.onChange(selectedCategories);
  }, [selectedCategories]);

  const renderCheckbox = (category: Category): JSX.Element => {
    return (
      <Checkbox
        value={category.category_id}
        key={category.category_id}
        isIndeterminate={findIsIndeterminate(category)}
        onChange={(e) => onChange(e)}
        isChecked={findIsChecked(category)}
      >
        {/* {category.name} */}
        {category.children ? (
          category.children.map((cat) => renderCheckbox(cat))
        ) : (
          <></>
        )}
      </Checkbox>
    );
  };

  const renderCheckboxGroup = (categoriesList: Category[]) => {
    return categoriesList.map((v: Category, i) => {
      return (
        <Box key={v.category_id} w="100%">
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            w="full"
            onClick={() => handleSetChild(v)}
          >
            {renderCheckbox(v)}
            {v?.children?.length ? <ChevronDownIcon /> : <></>}
          </Box>
          {v.children?.length ? (
            <Box
              marginLeft="7px"
              hidden={showChildren.includes(v.category_id)}
              display="flex"
              flexDirection="row"
            >
              <Box borderRight="1px solid black" w="0" marginRight="10px" />
              <Box display="flex" flexDirection="column">
                {renderCheckboxGroup(v.children)}
              </Box>
            </Box>
          ) : (
            <></>
          )}
        </Box>
      );
    });
  };

  return (
    <Box display="flex" flexDirection="column" w="100%">
      <Box textAlign="center" w="100%">
        Categories
      </Box>
      {loading ? <></> : renderCheckboxGroup(parentCategories)}
    </Box>
  );
}
