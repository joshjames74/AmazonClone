import { Button } from '@chakra-ui/react';
import { BasketButtonType } from '../types/BasketButton';
import { UserContext } from '../../../contexts';
import { useContext } from 'react';

export default function BasketButton(props: BasketButtonType): JSX.Element {
    const { basketCount } = useContext(UserContext);

    return (
        <Button fontSize='xs'>
            Basket {`(${basketCount ? basketCount : 0})`}
        </Button>
    )
}