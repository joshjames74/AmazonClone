import { Box, Button, FormControl, FormLabel, Select} from '@chakra-ui/react';
import { useContext, useEffect, useState } from 'react';
import { ProductContext, UserContext } from '../../../contexts';
import { ModalContext } from '../../../contexts/ModalContext';

export default function BasketCard(): JSX.Element {
    const { productInfo } = useContext(ProductContext);
    const { basket, addToBasket } = useContext(UserContext);
    const { currentAddress } = useContext(UserContext);
    const { showSelectAddressModal, setShowSelectAddressModal } = useContext(ModalContext);

    const [quantity, setQuantity] = useState<number>(1);

    const handleChange = (e: any): void => {
        setQuantity(e.target.value)
    }

    useEffect(() => {
        console.log(quantity);
        console.log(basket);
    }, [quantity]);

    const onClickAddBasket = () => {
        const array = [];
        for (let i=0; i < quantity; i++) {
            array.push(productInfo);
        };
        addToBasket(array)
    }

    const onClickDelivery = (): void => {
        setShowSelectAddressModal(!showSelectAddressModal);
    };

    return (
        <Box
        display='flex'
        flexDirection='column'
        padding='3px'>
            <Box>
                <b>{productInfo.currencyCode} {productInfo.price * quantity}</b>
            </Box>
            <Button
            onClick={onClickDelivery}>
                Deliver to {currentAddress.postCode}
            </Button>
            <FormControl
            onChange={handleChange}
            display='flex'
            flexDirection='row'
            >
                <Box
                textAlign='center'
                padding='3px'
                >
                    <FormLabel
                    textAlign='center'
                    padding='3px'>
                        Quantity:
                    </FormLabel>
                </Box>
                <Select>
                    {Array(20).fill('').map((v, i) => {
                        return <option>{i + 1}</option>
                    })}
                </Select>
            </FormControl>
            <Button
            w='100%'
            bgColor='orange.300'
            borderRadius='5px'
            paddingX='3px'
            marginBottom='3px'
            onClick={onClickAddBasket}>
                Add to basket
            </Button>
            <Button
            w='100%'
            bgColor='red.300'
            borderRadius='5px'
            paddingX='3px'
            marginBottom='3px'>
                Buy now
            </Button>
        </Box>
    )
}