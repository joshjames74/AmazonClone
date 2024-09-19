import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Button,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Category } from "../../../../api/entities";
import { useDispatch, useSelector } from "react-redux";
import { setQueryParams } from "../../../../redux/actions/productActions";
import { useRouter } from "next/router";
import { RootState } from "../../../../redux/store/store";


export default function SearchBar(): JSX.Element {

  const categories = useSelector((state: RootState) => state.settingsReducer.categories);

  const dispatch = useDispatch();
  const router = useRouter();

  const [category, setCategory] = useState<number>();
  const [searchText, setSearchText] = useState<string>("");

  const renderCategoriesAsOptions = (categories: Category[]): JSX.Element[] => {
    return categories.map((v: Category, i) => (
      <option key={i} value={v.category_id}>
        {v.name}
      </option>)
    );
  };

  useEffect(() => {
    if (category) {
      dispatch(setQueryParams({categories: [category]}))
    }
  }, [category]);

  const handleCategoryChange = (event: React.BaseSyntheticEvent) => {
    const id = event.target.value;
    if (id == 'All') { return }
    setCategory(parseInt(id));
  };

  const handleTextChange = (event: React.BaseSyntheticEvent) => {
    setSearchText(event.target.value);
  };

  const onClick = () => {
    dispatch(setQueryParams({ query: searchText }));
    if (category) { dispatch(setQueryParams({ categories: [category] })) }
    router.push("/");
  };

  return (
    <InputGroup
      w="100%"
      minW="40%"
      padding="0"
      borderColor="teal.700"
      borderRadius="2px"
    >
      <InputLeftAddon
        w="40%"
        maxW="fit-content"
        padding={0}
        margin={0}
        borderColor="teal.700"
        borderWidth="2px"
      >
        <Select
          minH="100%"
          borderRightRadius={0}
          border="none"
          fontSize="xs"
          color="black"
          margin={0}
          padding={0}
          display="inline-block"
          onChange={(event) => handleCategoryChange(event)}
        >
          <option>All</option>
          {renderCategoriesAsOptions(categories)}
        </Select>
      </InputLeftAddon>
      <Input
        type="search"
        placeholder="Search for anything..."
        paddingLeft="10px"
        paddingRight="0px"
        textOverflow="ellipsis"
        overflow="hidden"
        fontSize="s"
        bgColor="whiteAlpha.900"
        fontWeight={450}
        focusBorderColor="none"
        borderWidth="2px"
        borderX="none"
        _focus={{ border: "none" }}
        _hover={{ border: "none" }}
        onChange={(event) => handleTextChange(event)}
      />
      <InputRightAddon paddingX="0" bgColor="teal.700">
        <Button
          borderLeftRadius="0"
          h="100%"
          w="100%"
          margin="0"
          bgColor="teal.700"
          borderColor="teal.700"
          borderWidth="2px"
          borderLeft="none"
          onClick={onClick}
          _hover={{ bgColor: "teal.800", borderColor: "teal.800" }}
        >
          <SearchIcon color="white" />
        </Button>
      </InputRightAddon>
    </InputGroup>
  );
}
