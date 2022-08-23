import ProductCard from "../ProductCard";
import { ProductCardType } from "../types/ProductCardType";
import { SimpleGrid } from "@chakra-ui/react";

type ProductCardWrapperType = {
    productList: ProductCardType[];
}

export default function ProductCardWrapper(props: ProductCardWrapperType): JSX.Element {

    const gridItems = (): any => {
        if (!props.productList || props.productList.length === 0) {
            return;
        };

        return (
            props.productList.map((v: ProductCardType, i) => {
                return <ProductCard key={i} {...v}/>
            })
        );
    };

    return (
        <SimpleGrid minChildWidth='120px' spacing='40px'>
            {gridItems()}
        </SimpleGrid>
    )
}