import { CurrencyCode, AddressType, ProductInfo } from "../types";
import Navigation from "../views/components/navigation";
import defaultTheme from "../themes/defaultTheme";
import ProductCardWrapper from "../views/components/product/ProductCardWrapper";
import { CardType } from "../views/components/product/enums/CardType";
import Footer from "../views/components/footer";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { SettingsProvider } from "../views/contexts/SettingsContext";
import { AuthProvider, UserProvider } from "../views/contexts";
import { ModalProvider } from "../views/contexts/ModalContext";
import { FilterProvider } from "../views/contexts/FilterContext";
import Sidebar from "../views/components/sidebar";
import { PageProvider } from "../views/contexts/PageContext";

export default function Home() {
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)");

  return (
    <>
      <SettingsProvider>
        <AuthProvider>
          <UserProvider>
            <PageProvider>
              <FilterProvider>
                <ModalProvider>
                  <Box margin="0" padding="0">
                    <Navigation />
                    <Box
                      display="flex"
                      flexDirection="row"
                      paddingBottom="50px"
                    >
                      <Box
                        display="flex"
                        flexDirection={isLargerThan800 ? "row" : "column"}
                        w="100%"
                        justifyContent={isLargerThan800 ? "" : "center"}
                        alignItems={isLargerThan800 ? "" : "center"}
                        margin="0"
                        padding="0"
                      >
                        <Sidebar />
                        <ProductCardWrapper />
                      </Box>
                    </Box>
                    <Footer></Footer>
                  </Box>
                </ModalProvider>
              </FilterProvider>
            </PageProvider>
          </UserProvider>
        </AuthProvider>
      </SettingsProvider>
    </>
  );
}
