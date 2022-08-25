import { Box } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { ReviewStarsProps } from '../types/ReviewStars';

export default function ReviewStars(props: ReviewStarsProps): JSX.Element {
    return (
        <Box display='flex' alignItems='center'>
            {Array(5)
            .fill('')
            .map((_, i) => (
                <StarIcon
                key={i}
                color={i < props.reviewScore ? props.onColor : props.offColor}
                h={props.height}
                w={props.width}
                />
            ))
            }
        </Box>
    )
}