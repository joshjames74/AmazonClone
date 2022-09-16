import { SimpleGrid, Box } from "@chakra-ui/react";
import ProductCardCompact from "../ProductCard/ProductCardCompact";
import ProductCardWide from "../ProductCard/ProductCardWide";
import { CardType } from "../enums/CardType";
import { ProductListContext } from "../../../contexts";
import { useContext } from "react";
import { ProductInfo } from "../../../../types";

export type ProductCardWrapperProps = {
  cardType: CardType;
};

export default function ProductCardWrapper(
  props: ProductCardWrapperProps
): JSX.Element {
  const { productList } = useContext(ProductListContext);
  console.log(productList);

  if (!productList || productList.length === 0) {
    return <></>;
  }

  const compactCardWrapper = (): JSX.Element => {
    return (
      <SimpleGrid w="100%" minChildWidth="100px" spacing="5px">
        {productList.map((v: ProductInfo, i) => {
          return <ProductCardCompact key={i} {...v} />;
        })}
      </SimpleGrid>
    );
  };

  const wideCardWrapper = (): JSX.Element => {
    return (
      <Box display="flex" flexDirection="column">
        {productList.map((v: ProductInfo, i) => {
          return <ProductCardWide key={i} {...v} />;
        })}
      </Box>
    );
  };

  const renderBody = (cardType: CardType): JSX.Element => {
    if (cardType === CardType.compact) {
      return compactCardWrapper();
    }
    if (cardType === CardType.wide) {
      return wideCardWrapper();
    }
    return <></>;
  };

  return (
    <Box w="60%" border="1px solid black" margin="10px">
      {renderBody(props.cardType)}
    </Box>
  );
}
