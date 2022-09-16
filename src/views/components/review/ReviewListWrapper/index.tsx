import ReviewCard from "../ReviewCard";
import RatingsOverview from "../RatingsOverview";
import { ReviewType } from "../../../../types/Review";
import { Box } from '@chakra-ui/react';
import { ProductContext } from "../../../contexts";
import { useContext } from 'react';
import ReviewForm from "../../form/ReviewForm";

export default function ReviewListWrapper(): JSX.Element {

    const { reviewList } = useContext(ProductContext);

    return (
        <Box
        display='flex'
        flexDirection='row'
        w='100%'>
            <RatingsOverview />
            <Box
            display='flex'
            flexDirection='column'>
                <ReviewForm />
                <Box
                display='flex'
                flexDirection='column'
                h='600px'>
                    {reviewList.map((v: ReviewType, i) => {
                        return <ReviewCard key={i} {...v}/>
                    })}
                </Box>
            </Box>            
        </Box>
    )
}