import { Button, Box } from "@chakra-ui/react";
import { UserContext } from "../../../contexts";
import { useContext } from "react";
import Link from "next/link";
import { SettingsContext } from "../../../contexts/SettingsContext";
import NavigationButton from "../NavigationButton";

export default function BasketButton(): JSX.Element {
  const { basket, user } = useContext(UserContext);
  const { base_url } = useContext(SettingsContext);

  return (
    <NavigationButton>
      <Link
        href={user?.user_id ? `${base_url}/user/${user?.user_id}/basket` : "/"}
      >
        <Button fontSize="xs" padding="0.3em">
          Basket [{`${basket.length ? basket.length : 0}`} items]
        </Button>
      </Link>
    </NavigationButton>
  );
}
