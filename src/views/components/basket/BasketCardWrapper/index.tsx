import { UserContext } from "../../../contexts";
import ProductCardWide from "../../product/ProductCard/ProductCardWide";
import { Box, Button } from "@chakra-ui/react";
import { BasketItem, Product } from "../../../../api/entities";
import { useContext } from "react";
// import { BasketView } from "../../../../api/entities/BasketView";

export default function BasketCardWrapper(): JSX.Element {
  const { basket, loading } = useContext(UserContext);

  const renderBasketProducts = () => {
    if (!basket.length) {
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
    }
    return basket.map((v: BasketItem, i: number) => {
      return (
        <Box
        display='flex'
        flexDirection='row'
        marginBottom='3px'
        w='100%'>
          <ProductCardWide key={i} {...v.product} />
          <Box
          padding='3px'
          border='2px solid black'
          borderRadius='10px'
          display='flex'
          flexDirection='column'
          w='30%'>
            <p>Quantity: {v.quantity}</p>
            <Button>Delete</Button>
          </Box>
        </Box>
      )
    });
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Box 
        w="100vh"
        display="flex"
        flexDirection="column"
        >
          <Box 
          display='flex'
          justifyContent='center'
          alignItems='center'
          fontSize="xl"
          background='gray.100'
          h='10vh'
          margin='3px'>
            My Basket 
          </Box>
          {/* {basket.map((v: Product, i: number) => {
            return <ProductCardWide key={i} {...v} />;
          })} */}
          {!loading ? renderBasketProducts() : <></>}
        </Box>
      </Box>
    </>
  );
}
