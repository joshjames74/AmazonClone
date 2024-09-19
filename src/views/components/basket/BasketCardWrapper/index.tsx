import { UserContext } from "../../../contexts";
import ProductCardWide from "../../product/ProductCard/ProductCardWide";
import { Box, Button } from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { BasketItem, Product } from "../../../../api/entities";
import { useContext } from "react";
import { deleteBasketItem } from "../../../../api/helpers/requests/basket";
import Basket from "../../../../pages/user/[id]/basket";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux/store/store";

export default function BasketCardWrapper(): JSX.Element {
  const { user, basket, loading, reload } = useContext(UserContext);

  const router = useRouter();

  const handleClick = (id: number) => {
    deleteBasketItem(user.user_id, id).then(() => reload());
  };

  const handleCheckout = () => {
    router.push(`${router.asPath}/checkout`);
  };

  const conversionMultiple = useSelector(
    (state: RootState) => state.userReducer.conversionMultiple
  );
  const userCurrencySymbol = useSelector(
    (state: RootState) => state.userReducer.userCurrencySymbol
  );
  const subtotal = basket
    .map((item) => item.product.price * item.quantity * conversionMultiple)
    .reduce((acc, curr) => acc + curr, 0);

  const renderBasketProducts = (basket: BasketItem[]): JSX.Element[] => {
    return basket.map((v: BasketItem, i: number) => {
      return (
        <Box key={i}>
          <Box display="flex" flexDirection="row" marginBottom="3px" w="100%">
            <ProductCardWide key={i} {...v.product} />
            <Box
              padding="3px"
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
              w="20%"
            >
              <Box
                borderRadius="5px"
                padding="5px"
                textAlign="center"
                backgroundColor="gray.100"
                fontWeight="500"
              >
                Quantity: {v.quantity}
              </Box>
              <Button
                onClick={() => handleClick(v.item_id)}
                backgroundColor="red.100"
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      );
    });
  };

  const renderEmptyBasket = () => {
    return (
      <Box
        display="flex"
        justifyContent="center"
        padding="10px"
        border="1px solid black"
        borderRadius="8px"
      >
        No items in basket
      </Box>
    );
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="left"
      padding="3px"
      margin="20px"
    >
      <Box w="120vh" display="flex" flexDirection="column">
        <Box
          display="flex"
          alignItems="center"
          fontSize="3xl"
          h="10vh"
          margin="3px"
          paddingLeft="3px"
          textAlign="left"
        >
          Shopping Basket
        </Box>
        {!loading && !!basket.length ? (
          <>{renderBasketProducts(basket)}</>
        ) : (
          renderEmptyBasket()
        )}
        {!!basket.length && (
          <>
            <Box
              textAlign="right"
              w="100%"
              fontSize="xl"
              fontWeight="450"
              paddingRight="10px"
            >
              Subtotal: {userCurrencySymbol}
              {subtotal}
            </Box>
            <Button w="100%" onClick={handleCheckout}>
              Checkout
              <ChevronRightIcon />
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
}
