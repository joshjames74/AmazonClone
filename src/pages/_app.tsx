import "../styles/globals.css";
import "reflect-metadata";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { SettingsProvider } from "../views/contexts/SettingsContext";
import { AuthProvider, ProductListProvider, UserProvider } from "../views/contexts";
import { FilterProvider } from "../views/contexts/FilterContext";
import { ModalProvider } from "../views/contexts/ModalContext";
import { ThemeProvider } from "../views/contexts/ThemeContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <ThemeProvider>
        <SettingsProvider>
          <AuthProvider>
            <UserProvider>
              <ProductListProvider>
                <FilterProvider>
                  <ModalProvider>
                    <Component {...pageProps} />
                  </ModalProvider>
                </FilterProvider>
              </ProductListProvider>
            </UserProvider>
          </AuthProvider>
        </SettingsProvider>
      </ThemeProvider>
    </ChakraProvider>
  );
}

export default MyApp;
