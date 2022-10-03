import { Button, Box } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { UserContext } from "../../../contexts";

export default function ReturnsButton(): JSX.Element {

  const router = useRouter();
  const { user } = useContext(UserContext);

  const url = user && 'http://localhost:3000' + '/user/' + user.user_id.toString() + '/orders'

  return (
    <Link href={url ? url : ''}>
      <Button marginRight="3px">
        <Box display="flex" flexDirection="column" fontSize="xs">
          <Box>Orders</Box>
        </Box>
      </Button>
    </Link>
  );
}
