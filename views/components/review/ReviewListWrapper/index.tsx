import ReviewCard from "../ReviewCard";
import RatingsOverview from "../RatingsOverview";
import { ReviewType } from "../../../../types/Review";
import { Box } from '@chakra-ui/react';
import { ProductContext } from "../../../contexts";
import { useContext } from 'react';

export default function ReviewListWrapper(): JSX.Element {

    const { productInfo, reviewList } = useContext(ProductContext);

    return (
        <Box
        display='flex'
        flexDirection='row'
        w='100%'>
            <RatingsOverview />
            <Box>
                {reviewList.map((v: ReviewType, i) => {
                    return <ReviewCard {...v}/>
                })}
            </Box>            
        </Box>
    )
}