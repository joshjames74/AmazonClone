import { ProductCardType } from "../types/ProductCardType";
import { SimpleGrid, Box } from "@chakra-ui/react";
import ProductCardCompact from "../ProductCard/ProductCardCompact";
import ProductCardWide from "../ProductCard/ProductCardWide";
import { ProductCardWrapperType } from "../types/ProductCardWrapperType";
import { CardType } from "../enums/CardType";

export default function ProductCardWrapper(props: ProductCardWrapperType): JSX.Element {

    if (!props.productList || props.productList.length === 0) {
        return <></>
    }

    const compactCardWrapper = (): JSX.Element => {
        return (
            <SimpleGrid w='100%' minChildWidth='100px' spacing='5px'>
                {props.productList.map((v: ProductCardType, i) => {
                return <ProductCardCompact key={i} {...v}/>
                })}
            </SimpleGrid>
        )
    }

    const wideCardWrapper = (): JSX.Element => {
        return (
            <Box
            display='flex'
            flexDirection='column'>
                {props.productList.map((v: ProductCardType, i) => {
                    return <ProductCardWide key={i} {...v}/>
                })}
            </Box>
        )
    }

    const renderBody = (cardType: CardType): JSX.Element => {
        if (cardType === CardType.compact) {
            return compactCardWrapper();
        };
        if (cardType === CardType.wide) {
            return wideCardWrapper();
        };
        return <></>
    }

    return (
        <Box 
        w='60%'
        border='1px solid black'
        margin='10px'>
            {renderBody(props.cardType)}
        </Box>
    )
}