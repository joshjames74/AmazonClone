import BasketPage from "../views/components/basket/BasketPage";
import { AuthProvider, UserProvider } from "../views/contexts";
import { FilterProvider } from "../views/contexts/FilterContext";
import { ModalProvider } from "../views/contexts/ModalContext";
import { SettingsProvider } from "../views/contexts/SettingsContext";

export default function Basket(): JSX.Element {
  return <BasketPage />;
}
