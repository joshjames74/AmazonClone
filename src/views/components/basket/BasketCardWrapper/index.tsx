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

export default function BasketCardWrapper(): JSX.Element {
  const { user, basket, loading, reload } = useContext(UserContext);

  const router = useRouter();

  const handleClick = (id: number) => {
    deleteBasketItem(user.user_id, id).then(() => reload());
  };

  const handleCheckout = () => {
    router.push(`${router.asPath}/checkout`);
  };

  const renderBasketProducts = (basket: BasketItem[]): JSX.Element[] => {
    return basket.map((v: BasketItem, i: number) => {
      return (
        <Box key={i}>
          <Box display="flex" flexDirection="row" marginBottom="3px" w="100%">
            <ProductCardWide key={i} {...v.product} />
            <Box
              padding="3px"
              border="2px solid black"
              borderRadius="10px"
              display="flex"
              flexDirection="column"
              justifyContent="space-evenly"
              w="30%"
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
    <Box display="flex" flexDirection="column" alignItems="left" padding="3px">
      <Box w="120vh" display="flex" flexDirection="column">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          fontSize="xl"
          background="gray.100"
          h="10vh"
          margin="3px"
        >
          My Basket
        </Box>
        {!loading && !!basket.length ? (
          <>{renderBasketProducts(basket)}</>
        ) : (
          renderEmptyBasket()
        )}
        {!!basket.length && (
          <>
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              w="100%"
            >
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
