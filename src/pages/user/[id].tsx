import ProductPage from "../../views/components/product/ProductPage";
import { AuthProvider, ProductProvider, UserProvider } from "../../views/contexts";
import { SettingsProvider } from "../../views/contexts/SettingsContext";
import { ModalProvider } from "../../views/contexts/ModalContext";
import { FilterProvider } from "../../views/contexts/FilterContext";
import addSampleData from "../../api/utils/addSampleData";
import { useRouter } from "next/router";
import UserPage from "../../views/page-components/UserPage";

export default function User(): JSX.Element {

    return (
    <SettingsProvider>
        <AuthProvider>
            <UserProvider>
                <FilterProvider>
                    <ModalProvider>
                        <UserPage />
                    </ModalProvider>
                </FilterProvider>
            </UserProvider>
        </AuthProvider>
    </SettingsProvider>
    )
}