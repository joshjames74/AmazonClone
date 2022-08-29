import { UserContext } from "../../../contexts";
import ProductCardWide from "../../product/ProductCard/ProductCardWide";
import { Box } from '@chakra-ui/react';
import { ProductCardType } from "../../product/types/ProductCardType";
import { useContext } from 'react';

export default function BasketCardWrapper(): JSX.Element {
    const { basket } = useContext(UserContext);

    return (
        <>
            <Box
            display='flex'
            flexDirection='column'
            alignItems='center'>
                <Box
                w='50%'
                display='flex'
                flexDirection='column'>
                    <Box
                    textAlign='center'
                    fontSize='xl'>
                        My Basket
                    </Box>
                    {basket.map((v: ProductCardType, i: number) => {
                        return <ProductCardWide key={i} {...v}/>
                    })}
                </Box>
            </Box>
        </>
    )
}