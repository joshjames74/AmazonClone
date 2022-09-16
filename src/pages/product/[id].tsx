import ProductPage from "../../views/components/product/ProductPage";
import {
  AuthProvider,
  ProductProvider,
  UserProvider,
} from "../../views/contexts";
import { SettingsProvider } from "../../views/contexts/SettingsContext";
import { ModalProvider } from "../../views/contexts/ModalContext";
import { FilterProvider } from "../../views/contexts/FilterContext";
import addSampleData from "../../api/utils/addSampleData";
import { useRouter } from "next/router";

export default function Product(): JSX.Element {
  //addSampleData();
  const router = useRouter();
  const { id } = router.query;
  console.log(router);

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
