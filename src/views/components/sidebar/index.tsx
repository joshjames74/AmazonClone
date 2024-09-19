import RangeFilter from "./components/RangeFilter";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import CheckboxFilter from "./components/CheckboxFilter";
import { SettingsContext } from "../../contexts/SettingsContext";
import CheckBox from "./components/Checkbox";
import { Category } from "../../../api/entities";
import CheckboxWhole from "./components/Checkbox";
import PriceFilter from "./components/PriceFilter";
import ReviewFilter from "./components/ReviewFilter";
import { ThemeContext } from "../../contexts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store/store";
import { getAllCategories, getMostPopularCategories } from "../../../api/helpers/requests/categories";
import { setCategories } from "../../../redux/actions/settingsAction";
import { CategoryResponse } from "../../../api/services/ProductService";

export default function Sidebar(): JSX.Element {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");
  const [price, setPrice] = useState<number[]>([0, 100]);
  const { theme } = useContext(ThemeContext);

  const categories = useSelector(
    (state: RootState) => state.settingsReducer.categories
  );
  const dispatch = useDispatch();

  useEffect(() => {
    getAllCategories().then((res: CategoryResponse[]) => {
      dispatch(setCategories(res.map((v: CategoryResponse) => v.category)))
    }
    );
  }, []);

  return (
    <Box
      w={isLargerThan800 ? "40vh" : "100%"}
      h="fit-content"
      margin="10px"
      padding="10px"
      display="flex"
      flexDirection={isLargerThan800 ? "column" : "row"}
      gap="10px"
    >
      <PriceFilter
        min={0}
        max={100}
        step={1}
        title={"Price"}
        onChange={setPrice}
      />
      <CheckboxWhole categories={categories} />
      <ReviewFilter />
    </Box>
  );
}
