import { Button } from "@chakra-ui/react";
import { BasketButtonType } from "../types/BasketButton";
import { UserContext } from "../../../contexts";
import { useContext } from "react";
import Link from 'next/link';
import { SettingsContext } from "../../../contexts/SettingsContext";

export default function BasketButton(props: BasketButtonType): JSX.Element {
  const { basket, user, loading } = useContext(UserContext);
  const { base_url } = useContext(SettingsContext);

  return (
    <Link href={user?.user_id ? `${base_url}/user/${user?.user_id}/basket` : '/'}>
      <Button
      fontSize="xs"
      >
        Basket {`(${basket.length ? basket.length : 0})`}
      </Button>
      </Link>
  );
}
