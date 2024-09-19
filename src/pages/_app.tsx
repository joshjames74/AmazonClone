import "../styles/globals.css";
import "reflect-metadata";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { SettingsProvider } from "../views/contexts/SettingsContext";
import {
  AuthProvider,
} from "../views/contexts";
import { FilterProvider } from "../views/contexts/FilterContext";
import { ModalProvider } from "../views/contexts/ModalContext";
import { ThemeProvider } from "../views/contexts/ThemeContext";
import { PageContext } from "../views/contexts/PageContext";
import { useContext } from "react";
import { store } from "../redux/store/store";
import { Provider } from "react-redux";
import { UserProvider } from '@auth0/nextjs-auth0/client';

function MyApp({ Component, pageProps }: AppProps) {
  const { loading } = useContext(PageContext);

  return (
    !loading && (
      <Provider store={store}>
        <ChakraProvider>
          <ThemeProvider>
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
          </ThemeProvider>
        </ChakraProvider>
      </Provider>
    )
  );
}

export default MyApp;
