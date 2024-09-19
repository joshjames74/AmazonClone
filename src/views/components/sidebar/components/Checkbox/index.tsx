import { CheckBoxType } from "../../types/CheckBoxType";
import { Box, Checkbox, Button, useMediaQuery } from "@chakra-ui/react";
import { Category } from "../../../../../api/entities";
import { useState, useEffect, useContext } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import { PageContext } from "../../../../contexts/PageContext";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../../../../../redux/actions/settingsAction";
import { setQueryParams } from "../../../../../redux/actions/productActions";
import { RootState } from "../../../../../redux/store/store";

function CheckBox(props: CheckBoxType): JSX.Element {
  return (
    <Box display="flex" flexDirection="row" key={props.key}>
      <Checkbox
        value={props.key}
        key={props.key}
        onChange={props.onChange}
        isChecked={props.isChecked}
        marginLeft="3px"
      >
        {props.name}
      </Checkbox>
    </Box>
  );
}

export default function CheckboxWhole(props: {
  categories: Category[];
}): JSX.Element {


  const defaultSelectedCategories = props.categories.map((category: Category) => category.category_id);

  const [selectedCategories, setSelectedCategories] = useState<number[]>(defaultSelectedCategories);
  const [prevUpdateWasDirect, setPrevUpdateWasDirect] = useState<boolean>(true);
  const [display, setDisplay] = useState(false);

  const queryParams = useSelector((state: RootState) => state.productReducer.queryParams);
  const dispatch = useDispatch();

  // on change whether window is larger than 800px, close the filter
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  useEffect(() => {
    setDisplay(false);
  }, [isLargerThan800]);

  useEffect(() => {
    // if selected categories are different from queryParams
    if (queryParams.categories.sort() != selectedCategories.sort()) {
      dispatch(setQueryParams({ categories: selectedCategories }));
    }
  }, [selectedCategories]);

  useEffect(() => {
    if (queryParams.categories.sort() != selectedCategories.sort()) {
      setSelectedCategories(queryParams.categories);
    }
  }, [queryParams]);


  const onClick = () => {
    setDisplay(!display);
  };

  const clearAll = () => {
    setSelectedCategories([]);
  };

  const onChange = (event: any): void => {
    const id = parseInt(event?.target?.defaultValue);
    if (!id) {
      return;
    }

    // if already selected
    if (selectedCategories.includes(id)) {
      setSelectedCategories(
        selectedCategories.filter((value: number) => {
          return value !== id;
        })
      );
    } else {
      setSelectedCategories([...selectedCategories, id]);
    }
  };

  const isChecked = (id: number) => {
    return selectedCategories.includes(id);
  };

  function renderCategories(categories: Category[], indentation: number) {
    var out = [];
    for (let category of categories) {
      out.push(
        CheckBox({
          name: category.name,
          key: category.category_id,
          onChange: onChange,
          isChecked: isChecked(category.category_id),
        })
      );
    }
    return out;
  }

  return (
    <Box display="flex" flexDirection="column" w="100%" flexGrow={1}>
      <Button textAlign="center" onClick={onClick}>
        <Box display="flex" flexDirection="row" alignItems="end">
          Categories
          {display ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Box>
      </Button>
      <Box display={display ? "flex" : "none"} flexDirection="column">
        {renderCategories(props.categories, 0)}
      </Box>
      <Box display={display ? "" : "none"} as="button" onClick={clearAll}>
        Clear All
      </Box>
    </Box>
  );
}
