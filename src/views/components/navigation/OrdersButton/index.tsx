import { useUser } from "@auth0/nextjs-auth0/client";
import { Button, Box } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import NavigationButton from "../NavigationButton";

export default function ReturnsButton(): JSX.Element {

  const router = useRouter();
  const { user, error, isLoading } = useUser();

  const url =
    user && user.org_id &&
    "http://localhost:3000" + "/user/" + user.org_id.toString() + "/orders";

  return (
    <NavigationButton>
      <Link href={url ? url : ""}>
        <Button fontSize="xs" padding="0.3em">
          Orders
        </Button>
      </Link>
    </NavigationButton>
  );
}
