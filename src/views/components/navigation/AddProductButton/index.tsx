import { PlusSquareIcon } from "@chakra-ui/icons";
import { Box, Button, Text } from "@chakra-ui/react";
import Link from "next/link";
import NavigationButton from "../NavigationButton";

export default function AddProductButton() {
  return (
    <NavigationButton>
      <Box 
      w="fit-content">
        <Link href="http://localhost:3000/product/add">
          <Button fontSize="xs" padding="0.3em">
            <PlusSquareIcon />
            <Text> Product </Text>
          </Button>
        </Link>
      </Box>
    </NavigationButton>
  );
}
