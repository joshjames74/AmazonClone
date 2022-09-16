import { FormControl, Box, Button } from "@chakra-ui/react";
import { useState, useContext, useEffect } from "react";
import { CurrencyCode, UserType } from "../../../../types";
import { AuthContext } from "../../../contexts";
import InputBox from "../InputBox";
import ImageInputBox from "../ImageInputBox";
import {
  validatePrice,
  validateTitle,
  validateDescription,
  validateImage,
} from "./Validation";
import { ProductInfo } from "../../../../types";
import { addProduct } from "../../../../api/helpers/requests/product";
import CurrencyInputBox from "../CurrencyInputBox";
import { createConnection } from "../../../../data-source";
import { Product } from "../../../../api/entities/index";
import { SettingsContext } from "../../../contexts/SettingsContext";
import CategoryInputBox from "../CategoryInputBox";

export default function ProductForm(): JSX.Element {
  const { userId } = useContext(AuthContext);

  // if (userType !== UserType.admin && userType !== UserType.seller) {
  //     return null;
  // }

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [images, setImages] = useState<string>();
  const [currencyId, setCurrencyId] = useState<number>();
  const [canSubmit, setCanSubmit] = useState<boolean>(true);

  useEffect(() => {
    setCanSubmit(
      validateTitle(title) &&
        validatePrice(price) &&
        validateDescription(description)
    );
  }, [title, description, price, images, currencyId]);

  const handleSubmit = () => {
    const product: ProductInfo = {
      productId: null,
      title: title,
      description: description,
      price: price,
      imageURL: images,
      reviewScore: 0,
      reviewCount: 0,
      currencyCode: CurrencyCode.GBP,
    };
    addProduct(product, userId, currencyId).then((res) => {
      if (res) {
        console.log("success");
      }
      if (!res) {
        console.log("failure");
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
        placeholder="Enter title..."
        onChange={(event) => setTitle(event.target.value)}
        isInvalid={!validateTitle(title)}
      />

      <InputBox
        label="Description"
        type="text"
        placeholder="Enter description..."
        onChange={(event) => setDescription(event.target.value)}
        isInvalid={!validateDescription(description)}
      />

      <CurrencyInputBox
        onChangePrice={(event) => setPrice(event.target.value)}
        onChangeCurrency={(event) => setCurrencyId(event.target.value)}
      />

      <ImageInputBox
        placeholder="Images"
        onChange={(event) => setImages(event.target.value)}
        isInvalid={!validateImage(images)}
        multiple={false}
      />

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
