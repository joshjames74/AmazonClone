import ProductPage from "../../views/components/product/ProductPage";
import {
  AuthProvider,
  ProductProvider,
  UserProvider,
} from "../../views/contexts";
import { SettingsProvider } from "../../views/contexts/SettingsContext";
import { ModalProvider } from "../../views/contexts/ModalContext";
import { FilterProvider } from "../../views/contexts/FilterContext";

export default function Product(): JSX.Element {
  return (
    <SettingsProvider>
      <AuthProvider>
        <UserProvider>
          <FilterProvider>
            <ModalProvider>
              <ProductProvider>
                <ProductPage />
              </ProductProvider>
            </ModalProvider>
          </FilterProvider>
        </UserProvider>
      </AuthProvider>
    </SettingsProvider>
  );
}
