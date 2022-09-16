import ReviewForm from "../../../views/components/form/ReviewForm";
import Navigation from "../../../views/components/navigation";
import { Box } from '@chakra-ui/react';

export default function AddReview(): JSX.Element {
    return (
        <Box
        display='flex'
        flexDirection='column'>
            <Navigation />
            <ReviewForm />
        </Box>
    )
}