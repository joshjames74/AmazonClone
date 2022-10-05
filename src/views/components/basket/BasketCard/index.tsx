import { Box, Button, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { BasketItem } from "../../../../api/entities";
import { addToBasket } from "../../../../api/helpers/requests/basket";
import { ProductContext, ThemeContext, UserContext } from "../../../contexts";
import SelectAddressModal from "../../navigation/DeliveryButton/modals/SelectAddressModal";

export default function BasketCard(): JSX.Element {
  const { product, convertedPrice } = useContext(ProductContext);
  const { theme } = useContext(ThemeContext);
  const { currentAddress, user, reload } = useContext(UserContext);
  const [showSelectAddressModal, setShowSelectAddressModal] =
    useState<boolean>(false);

  const [quantity, setQuantity] = useState<number>(1);

  const handleChange = (e: any): void => {
    setQuantity(e.target.value);
  };

  const onClickAddBasket = () => {
    const basketItem = new BasketItem();
    basketItem.product = product;
    basketItem.date_added = new Date();
    basketItem.quantity = quantity;
    addToBasket(user.user_id, basketItem).then(() => reload());
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      h="100%"
      padding="3px"
      border={`2px solid ${theme.colors.product.border}`}
      borderLeft="none"
      borderRadius="0 10px 10px 0"
    >
      <Box fontWeight="500">
        {user ? user.currency.code : ""}{" "}
        {convertedPrice ? Number(convertedPrice * quantity).toFixed(2) : 0}
      </Box>
      <Button
        onClick={() => setShowSelectAddressModal(!showSelectAddressModal)}
      >
        Deliver to {currentAddress?.postcode}
      </Button>
      <FormControl onChange={handleChange} display="flex" flexDirection="row">
        <Box textAlign="center" padding="3px">
          <FormLabel textAlign="center" padding="3px">
            Quantity:
          </FormLabel>
        </Box>
        <Select>
          {Array(20)
            .fill("")
            .map((v, i) => {
              return <option key={i}>{i + 1}</option>;
            })}
        </Select>
      </FormControl>
      <Button
        w="100%"
        bgColor="orange.300"
        borderRadius="5px"
        paddingX="3px"
        marginBottom="3px"
        onClick={onClickAddBasket}
      >
        Add to basket
      </Button>
      <Button
        w="100%"
        bgColor="red.300"
        borderRadius="5px"
        paddingX="3px"
        marginBottom="3px"
      >
        Buy now
      </Button>
      <SelectAddressModal
        isOpen={showSelectAddressModal}
        onClose={() => setShowSelectAddressModal(false)}
      />
    </Box>
  );
}
