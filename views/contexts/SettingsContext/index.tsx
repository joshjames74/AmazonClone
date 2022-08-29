import React, { useState } from 'react';
import { CurrencyCode } from '../../../types';

export const SettingsContext = React.createContext<{
    categories: string[];
    defaultLocation: string;
    defaultCurrency: CurrencyCode;
}>({
    categories: [],
    defaultLocation: 'US',
    defaultCurrency: CurrencyCode.USD
});

export const SettingsProvider = (props: { children?: JSX.Element }) => {
    const { children } = props;

    const [categories, setCategories] = useState<string[]>([
        'All',
        'Home',
        'Outdoor',
        'Clothing',
        'Gardening',
        'Technology',
        'Kitchen'
    ]);

    return (
        <SettingsContext.Provider
        value={{
            categories: categories,
            defaultLocation: 'US',
            defaultCurrency: CurrencyCode.GBP
        }}>
            {children}
        </SettingsContext.Provider>
    )
};