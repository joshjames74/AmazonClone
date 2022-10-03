import { Modal, ModalContent, ModalHeader, Box, Select, Button } from "@chakra-ui/react";
import { useContext, useState } from "react"
import { putUserCurrency } from "../../../../../api/helpers/requests/user";
import { Currency } from "../../../../../data-source";
import { ProductListContext, UserContext } from "../../../../contexts";
import { SettingsContext } from "../../../../contexts/SettingsContext"

interface IChangeCurrencyModal {
    isOpen: boolean;
    onClose: () => void;
}

export default function ChangeCurrencyModal(props: IChangeCurrencyModal) {
    
    const { isOpen, onClose } = props;
    const { currencies } = useContext(SettingsContext);
    const { user } = useContext(UserContext);

    const [selectedCurrency, setSelectedCurrency] = useState<number>();

    const renderCurrencies = (currencies: Currency[]) => {
        return currencies.map((currency: Currency, index) => {
            return (
                <option key={index} value={currency.currency_id}>{currency.code}</option>
            )
        })
    }

    const handleChange = (option) => {
        const currency = currencies.filter(currency => currency.currency_id === parseInt(option.target.value))[0]
        setSelectedCurrency(currency);
    }

    const handleSave = () => {
        putUserCurrency(user.user_id, selectedCurrency).then(res => {
            onClose();
        });
    }

    return (
        <Modal
        isOpen={isOpen}
        onClose={onClose}
        >
            <ModalContent
            display='flex'
            flexDirection='column'
            padding='5px'>
                <ModalHeader
                padding='5px'
                textAlign='center'>
                    Select Currency
                </ModalHeader>
                <Box>
                    <Select
                    onChange={handleChange}>
                        {currencies?.length ? renderCurrencies(currencies) : <></>}
                    </Select>
                </Box>
                <Box
                display='flex'
                flexDirection='row'
                justifyContent='space-between'
                padding='5px'>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button
                    disabled={!(!!selectedCurrency)}
                    onClick={() => handleSave()}>Save</Button>
                </Box>
            </ModalContent>
        </Modal>
    )
}