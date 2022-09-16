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

export default function Home() {
  const props: ProductInfo = {
    productId: 0,
    title: "Sample product",
    description: "Description",
    imageURL:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-pink-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572315935",
    price: 120,
    currencyCode: CurrencyCode.GBP,
    reviewScore: 4.3,
    reviewCount: 90000,
  };

  const address: AddressType = {
    name: "Joshua",
    number: "33",
    county: "Cardiff",
    postCode: "CF23 9BN",
  };

  const propsArray: ProductInfo[] = [props, props, props];

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
