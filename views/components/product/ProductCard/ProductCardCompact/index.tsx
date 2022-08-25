import { ProductCardType } from "../../types/ProductCardType";
import { Box, Image } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import ReviewStars from "./../components/ReviewStars";
import { ReviewStarsProps } from "./../components/types/ReviewStars";
import { ProductContext } from "../../../../contexts";
import { useContext } from 'react';

export default function ProductCardCompact(props: ProductCardType): JSX.Element {

    const reviewStarsProps: ReviewStarsProps = {
        reviewScore: props.reviewScore,
        onColor: 'teal',
        offColor: 'black'
    };

    return (
        <Link href={props.url ? props.url : ''}>
            <Box 
                overflow='hidden'
                borderWidth='3px'
                borderRadius='lg'
                borderColor='teal.500'
                padding='3px'
                width='100px'
                height='150px'
                fontFamily='Helvetica'
                display='flex'
                flexDirection='column'
                alignContent='center'
                >
                <Image
                    h='50%'
                    src={props.imageURL ? props.imageURL : '#'}
                    alt={props.imageAlt ? props.imageAlt : ''}
                >
                </Image>
                <Box h='50%'>
                    <Box display='flex' flexDirection='column'>
                        <Box textColor='blue' fontSize='xs' h='20%'>
                            <a 
                            href={props.url ? props.url : '/'}>
                                {props.title}
                            </a>
                        </Box>
                        <Box h='20%'>
                            {props.currencyCode} {props.price}
                        </Box>
                        <Box display='flex' flexDirection='column' h='25%' w='100%'>
                            <ReviewStars {...reviewStarsProps}/>
                            <Box>
                                {`${props.reviewCount} reviews`}
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Link>
    )
};