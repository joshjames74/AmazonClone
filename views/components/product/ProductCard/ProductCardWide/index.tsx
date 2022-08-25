import { Box, Image } from '@chakra-ui/react';
import { ProductCardType } from '../../types/ProductCardType';
import ReviewStars from '../components/ReviewStars';
import { ReviewStarsProps } from '../components/types/ReviewStars';

export default function ProductCardWide(props: ProductCardType): JSX.Element {

    const reviewStarsProps: ReviewStarsProps = {
        reviewScore: props.reviewScore,
        onColor: 'teal',
        offColor: 'black'
    };

    return (
        <Box
        display='flex'
        flexDirection='row'
        padding='3px'
        h='100px'
        bgColor='gray.300'
        borderRadius='lg'
        border='1px solid black'>
            <Image 
            src={props.imageURL ? props.imageURL : '#'}
            alt={props.imageAlt ? props.imageAlt : ''}
            h='100%'
            />
            <Box
            display='flex'
            flexDirection='column'>
                <Box>
                    {props.title}
                </Box>
                <Box
                display='flex'
                flexDirection='row'>
                    <ReviewStars {...reviewStarsProps}/>
                    {props.reviewCount}
                </Box>
                <Box>
                    {props.currencyCode} {props.price}
                </Box>
                <Box>
                    {props.description}
                </Box>
            </Box>
        </Box>
    )
}