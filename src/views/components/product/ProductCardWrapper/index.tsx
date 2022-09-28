import { SimpleGrid, Box } from "@chakra-ui/react";
import ProductCardCompact from "../ProductCard/ProductCardCompact";
import ProductCardWide from "../ProductCard/ProductCardWide";
import { CardType } from "../enums/CardType";
import { ProductListContext } from "../../../contexts";
import { useContext } from "react";
import { Product } from "../../../../api/entities";

export type ProductCardWrapperProps = {
  cardType: CardType;
};

export default function ProductCardWrapper(
  props: ProductCardWrapperProps
): JSX.Element {
  const { productList } = useContext(ProductListContext);
  const productCount = 10;

  if (!productList || productList.length === 0) {
    return <></>;
  }

  const products = productList.filter((_, i) => {
    return i < productCount;
  });

  const compactCardWrapper = (): JSX.Element => {
    return (
      <SimpleGrid w="100%" minChildWidth="100px" spacing="5px">
        {products.map((v, i) => {
          return <ProductCardCompact key={i} {...v} />;
        })}
      </SimpleGrid>
    );
  };

  const wideCardWrapper = (): JSX.Element => {
    return (
      <Box display="flex" flexDirection="column">
        {products.map((v, i) => {
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
    <Box w="60%" margin="10px">
      {renderBody(props.cardType)}
    </Box>
  );
}
