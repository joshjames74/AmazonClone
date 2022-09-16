import { Box, Button } from '@chakra-ui/react';
import { useState, useContext, useEffect } from 'react';
import { CurrencyCode, UserType } from '../../../../types';
import { AuthContext, ProductContext } from '../../../contexts';
import InputBox from '../InputBox';
import { validateTitle, validateContent, validateRating } from './Validation';
import RatingInputBox from '../RatingInputBox';
import { ReviewType } from '../../../../types/Review';
import { addReview } from '../../../../api/helpers/requests/review';

export default function ReviewForm(): JSX.Element {

    const { userId } = useContext(AuthContext);
    const { productInfo, onUpdateReview } = useContext(ProductContext);
    console.log(productInfo);

    // not necessary
    // if (userType !== UserType.admin && userType !== UserType.seller) {
    //     return null;
    // }

    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [rating, setRating] = useState<number>(0);
    const [canSubmit, setCanSubmit] = useState<boolean>(true);

    useEffect(() => {
        console.log(`Title: ${title}`);
        console.log(`Conent: ${content}`);
        console.log(`Rating: ${rating}`);
        setCanSubmit((
            validateTitle(title) &&
            validateContent(content) &&
            validateRating(rating)
        ))
    }, [title, content, rating]);

    const handleSubmit = () => {
        const review: ReviewType = {
            userInfo: null,
            title: title,
            content: content,
            score: rating,
            date: new Date(),
            images: ['']
        };
        addReview(review, productInfo.productId, userId).then(response => {
            console.log(response);
        })
        onUpdateReview();
    };

    return (
            <Box
            w='100%'
            border='1px solid black'
            margin='5px'
            padding='5px'
            borderRadius='3px'>
                <InputBox 
                label='Title'
                type='text'
                placeholder='Enter title...'
                onChange={(event) => setTitle(event.target.value)}
                isInvalid={!validateTitle(title)}/>

                <InputBox 
                label='Content'
                type='text'
                placeholder='Enter content...'
                onChange={(event) => setContent(event.target.value)}
                isInvalid={!validateContent(content)}/>

                <RatingInputBox 
                label='Rating'
                placeholder='0'
                onChange={(event) => setRating(event.target.value)}
                isInvalid={!validateRating(rating)}
                />

                <Box
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
                marginTop='3px'>
                    <Button>Cancel</Button>
                    <Button 
                    disabled={!canSubmit}
                    type='submit'
                    onClick={handleSubmit}>Add</Button>
                </Box>
            </Box>
    )
}