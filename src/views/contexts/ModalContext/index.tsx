import React, { useState } from 'react';

export const ModalContext = React.createContext<{
    showSelectAddressModal: boolean;
    setShowSelectAddressModal: (value: boolean) => void;
}>({
    showSelectAddressModal: false,
    setShowSelectAddressModal: () => console.log('')
});

export const ModalProvider = (props: { children?: JSX.Element }): JSX.Element => {
    const { children } = props;
    const [showSelectAddressModal, setShowSelectAddressModal] = useState<boolean>(false);

    return (
        <ModalContext.Provider
        value={{
            showSelectAddressModal: showSelectAddressModal,
            setShowSelectAddressModal: setShowSelectAddressModal
        }}>
            {children}
        </ModalContext.Provider>
    )
}