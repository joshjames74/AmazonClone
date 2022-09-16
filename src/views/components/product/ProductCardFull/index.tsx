import { useContext } from "react"
import { ProductContext, UserContext } from "../../../contexts"
import { Box, Image } from '@chakra-ui/react';
import ReviewStars from "../ProductCard/components/ReviewStars";
import { userInfo } from "os";

export default function ProductCardFull(): JSX.Element {
    const { productInfo } = useContext(ProductContext);
    const { currentAddress } = useContext(UserContext);

    return (
        <Box
        display='flex'
        flexDirection='row'
        border='1px solid black'>
            <Image 
            src={productInfo.imageURL ? productInfo.imageURL : ''}
            w='50%'
            h='100%'/>
            <Box
            display='flex'
            flexDirection='column'
            border='1px solid black'
            w='50%'
            padding='3px'>
                <Box><b>{productInfo.title}</b></Box>
                <Box
                display='flex'
                flexDirection='row'>
                    <ReviewStars reviewScore={productInfo.reviewScore}/>
                    &bull;
                    <Box>{productInfo.reviewCount} reviews</Box>
                </Box>
                <Box>
                    {productInfo.currencyCode} {productInfo.price}
                </Box>
                <Box>{productInfo.description}</Box>
            </Box>
        </Box>
    )
}