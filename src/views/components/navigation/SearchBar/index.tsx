import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Button,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { Category } from "../../../../api/entities";
import { ProductListContext } from "../../../contexts";
import Link from "next/link";

export default function SearchBar(): JSX.Element {
  const { parentCategories, loading } = useContext(SettingsContext);
  const { search } = useContext(ProductListContext);

  const [category, setCategory] = useState<Category>();
  const [searchQuery, setSearchQuery] = useState<string>();

  const renderCategories = (categories: Category[]): JSX.Element[] => {
    return categories.map((v: Category, i) => {
      return (
        <option key={i} value={v.category_id}>
          {v.name}
        </option>
      );
    });
  };

  const handleCategoryChange = (event) => {
    const id = event.target.value;
    const category = parentCategories.filter(category => {
      return category.category_id = id
    })[0];
    if (category) {
      setCategory(category);
    }
  }

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  }

  return (
    <InputGroup maxW="150vh" w="40%" marginRight="3px">
      <InputLeftAddon w="40%">
        <Select
        w="100%"
        h="100%"
        color="black"
        onChange={(event) => handleCategoryChange(event)}>
          <option>All</option>
          {loading ? <></> : renderCategories(parentCategories)}
        </Select>
      </InputLeftAddon>
      <Input
        type="search"
        placeholder="Search for anything..."
        paddingX="5px"
        textOverflow="ellipsis"
        fontSize="xs"
        bgColor="whiteAlpha.900"
        borderRadius="0"
        onChange={event => handleChange(event)}
      />
      <InputRightAddon 
      paddingX="3px">
        <Link href={{
          pathname: '/',
          query: {query: searchQuery, categories: [category]}
        }}>
            <SearchIcon />
        </Link>
      </InputRightAddon>
    </InputGroup>
  );
}
