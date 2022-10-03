import { Box, Button } from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts";
import InputBox from "../InputBox";
import ImageInputBox from "../ImageInputBox";
import {
  validatePrice,
  validateTitle,
  validateDescription,
  validateImage,
  validateCategories,
} from "./Validation";
import { postProduct } from "../../../../api/helpers/requests/product";
import CurrencyInputBox from "../CurrencyInputBox";
import { Product, Currency } from "../../../../api/entities/index";
import CategoryInputBox from "../CategoryInputBox";
import { SettingsContext } from "../../../contexts/SettingsContext";
import { NextResponse } from 'next/server';
import { useRouter } from 'next/router';

export default function ProductForm(): JSX.Element {
  const { user } = useContext(AuthContext);
  const router = useRouter();

  // if (userType !== UserType.admin && userType !== UserType.seller) {
  //     return null;
  // }

  const defaultCurrency: Currency = {
    currency_id: 1,
    code: "GBP",
    symbol: "£",
  };

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [images, setImages] = useState<string>(
    "https://webneel.com/daily/sites/default/files/images/daily/08-2018/1-nature-photography-spring-season-mumtazshamsee.jpg"
  );
  const [currency, setCurrency] = useState<Currency>(defaultCurrency);
  const [selectCategories, setSelectCategories] = useState<string[]>([]);
  const [canSubmit, setCanSubmit] = useState<boolean>(true);

  useEffect(() => {
    setCanSubmit(
      // split into single function in validation files
        validateTitle(title) &&
        validatePrice(price) &&
        validateDescription(description) &&
        validateCategories(selectCategories)
    );
  }, [title, description, price, images, selectCategories]);

  const handleSubmit = () => {
    const product = new Product();
    product.title = title;
    product.description = description;
    product.price = price;
    product.image_url = images;
    product.image_alt = "";
    product.review_score = 0;
    product.review_count = 0;
    product.currency = currency;
    product.seller = user;
    postProduct(product).then((res) => {
      if (res?.data?.product) {
        const url = `/product/${res.data.product.product_id}`;
        router.replace(url);
      }
    });
  };

  return (
    <Box
      w="70%"
      h="50%"
      border="1px solid black"
      margin="5px"
      padding="5px"
      borderRadius="3px"
    >
      <InputBox
        label="Title"
        type="text"
        value={title}
        placeholder="Enter title..."
        onChange={(event) => setTitle(event.target.value)}
        isInvalid={!validateTitle(title)}
      />

      <InputBox
        label="Description"
        type="text"
        value={description}
        placeholder="Enter description..."
        onChange={(event) => setDescription(event.target.value)}
        isInvalid={!validateDescription(description)}
      />

      <CurrencyInputBox
        onChangePrice={(event) => setPrice(event.target.value)}
        onChangeCurrency={(event) =>
          setCurrency(JSON.parse(event.target.value))
        }
      />

      <CategoryInputBox onChange={(values) => setSelectCategories(values)} />

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        marginTop="3px"
      >
        <Button>Cancel</Button>
        <Button disabled={!canSubmit} type="submit" onClick={handleSubmit}>
          Add
        </Button>
      </Box>
    </Box>
  );
}
