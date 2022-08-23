import { ProductCardType } from "../types/ProductCardType";
import { Box, Image } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import Link from 'next/link';


export default function ProductCard(props: ProductCardType): JSX.Element {

    const reviewBox = () => {
        if (!props.reviewScore || props.reviewScore > 5 || props.reviewScore < 0 ) {
            return;
        };

        return (
            <Box display='flex' alignItems='center'>
                {Array(5)
                .fill('')
                .map((_, i) => (
                    <StarIcon
                    key={i}
                    color={i < props.reviewScore ?  'teal' : 'gray'}
                    />
                ))
                }
                {`${props.reviewCount} reviews`}
            </Box>
        )

    };

    return (
        <Link href={props.url ? props.url : ''}>
            <Box 
                overflow='hidden'
                borderWidth='1px'
                borderRadius='lg'
                width='100px'
                height='100px'
                >
                <Image
                    w='50px'
                    h='50px'
                    src={props.imageURL ? props.imageURL : '#'}
                    alt={props.imageAlt ? props.imageAlt : ''}
                >
                </Image>
                <Box p='6'>
                    <Box display='flex' flexDirection='column'>
                        <Box>
                            {props.title}
                        </Box>
                        {reviewBox()}
                    </Box>
                </Box>
            </Box>
        </Link>
    )
};