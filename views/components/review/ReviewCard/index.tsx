import { Box, Image } from '@chakra-ui/react';
import { ReviewType } from '../../../../types/Review';
import { UserInfo } from '../../../../types/UserInfo';
import ReviewStars from '../../product/ProductCard/components/ReviewStars';
import RatingsOverview from '../RatingsOverview';

export default function ReviewCard(review: ReviewType): JSX.Element {

    const reviewStarsProps = {
        onColor: 'black',
        offColor: 'teal',
        reviewScore: review.score
    }

    const renderImages = () => {
        if (!review.images || review.images.length === 0) {
            return;
        };

        // Render images here
    }

    const ratingOverviewProps = {
        averageRating: 3.5,
        totalReviews: 25
    }

    return (
        <Box
        display='flex'
        flexDirection='column'
        border='1px solid black'
        h='100px'
        w='400px'
        >
            <Box
            display='flex'
            flexDirection='row'
            h='15%'
            minH='5vw'
            w='100%'
            paddingX='3px'
            border='1px solid black'
            >
                <Image 
                src={review.userInfo.imageURL ? review.userInfo.imageURL : ''}
                w='10%'
                h='100%'
                borderRadius='100%'
                bgColor='blue.500'
                marginRight='3px' />
                <Box>
                    {review.userInfo.userName}
                </Box>
            </Box>
            <Box
            display='flex'
            flexDirection='row'>
                <ReviewStars {...reviewStarsProps}/>
                <Box
                marginLeft='5px'><b>{review.title}</b></Box>
            </Box>
            <Box>
                {review.content}
            </Box>
            {renderImages()}
        </Box>
    );
};