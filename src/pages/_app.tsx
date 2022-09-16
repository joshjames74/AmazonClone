import '../styles/globals.css'
import "reflect-metadata";
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { SettingsProvider } from '../views/contexts/SettingsContext';
import { AuthProvider, UserProvider } from '../views/contexts';
import { FilterProvider } from '../views/contexts/FilterContext';
import { ModalProvider } from '../views/contexts/ModalContext';
import { createConnection } from '../data-source';

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <ChakraProvider>
      <SettingsProvider>
            <AuthProvider>
                <UserProvider>
                    <FilterProvider>
                        <ModalProvider>
                          <Component {...pageProps} />
                        </ModalProvider>
                    </FilterProvider>
                </UserProvider>
            </AuthProvider>
        </SettingsProvider>
    </ChakraProvider>
  )
}

export default MyApp
