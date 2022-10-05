import { CurrencyCode, AddressType, ProductInfo } from "../types";
import Navigation from "../views/components/navigation";
import defaultTheme from "../themes/defaultTheme";
import ProductCardWrapper from "../views/components/product/ProductCardWrapper";
import { CardType } from "../views/components/product/enums/CardType";
import Footer from "../views/components/footer";
import { Box } from "@chakra-ui/react";
import NavigationSidebar from "../views/components/sidebar/NavigationSidebar";
import { SettingsProvider } from "../views/contexts/SettingsContext";
import {
  AuthProvider,
  ProductListProvider,
  UserProvider,
} from "../views/contexts";
import { ModalProvider } from "../views/contexts/ModalContext";
import { FilterProvider } from "../views/contexts/FilterContext";
import { useContext } from "react";
import { ProductListContext } from "../views/contexts";

export default function Home() {

  const navigationSidebarProps = {
    minPrice: 0,
    maxPrice: 100,
    priceStep: 1,
    currencyCode: CurrencyCode.GBP,
    categories: ["Home", "Outdoor", "Technology", "Clothing"],
  };

  return (
    <>
      <SettingsProvider>
        <AuthProvider>
          <UserProvider>
            <FilterProvider>
              <ModalProvider>
                <ProductListProvider>
                  <>
                    <Navigation />
                    <Box display="flex" flexDirection="row">
                      <NavigationSidebar {...navigationSidebarProps} />
                      <ProductCardWrapper cardType={CardType.wide} />
                    </Box>
                    <Footer></Footer>
                  </>
                </ProductListProvider>
              </ModalProvider>
            </FilterProvider>
          </UserProvider>
        </AuthProvider>
      </SettingsProvider>
    </>
  );
}
