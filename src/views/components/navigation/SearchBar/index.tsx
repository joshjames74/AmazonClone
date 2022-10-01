import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputLeftAddon,
  InputRightAddon,
  Select,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { Category } from "../../../../api/entities";

export default function SearchBar(): JSX.Element {
  const { parentCategories, loading } = useContext(SettingsContext);

  const [category, setCategory] = useState<string>("All");

  const renderCategories = (categories: Category[]): JSX.Element[] => {
    return categories.map((v: Category, i) => {
      return (
        <option key={i} value={v.name}>
          {v.name}
        </option>
      );
    });
  };

  return (
    <InputGroup maxW="150vh" w="40%" marginRight="3px">
      <InputLeftAddon w="40%">
        {/* <InputLeftAddon
          as={Button}
          maxW="20vh"
          w="20%"
          fontSize="xs"
          display='flex'
          flexDirection='row'
          color='black'
        > */}
        <Select w="100%" h="100%" color="black">
          <option>All</option>
          {loading ? <></> : renderCategories(parentCategories)}
        </Select>
        {/* </InputLeftAddon> */}
      </InputLeftAddon>
      <Input
        type="search"
        placeholder="Search for anything..."
        paddingX="5px"
        textOverflow="ellipsis"
        fontSize="xs"
        bgColor="whiteAlpha.900"
        borderRadius="0"
      />
      <InputRightAddon paddingX="3px">
        <SearchIcon />
      </InputRightAddon>
    </InputGroup>
  );
}
