import { Button } from '@chakra-ui/react';
import { BasketButtonType } from './types';

export default function BasketButton(props: BasketButtonType): JSX.Element {
    return (
        <Button>
            Your basket {`(${props.itemCount} items)`}
        </Button>
    )
}