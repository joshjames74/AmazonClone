import { Button } from '@chakra-ui/react';
import { BasketButtonType } from '../types/BasketButton';

export default function BasketButton(props: BasketButtonType): JSX.Element {
    return (
        <Button fontSize='xs'>
            Basket {`(${props.itemCount})`}
        </Button>
    )
}