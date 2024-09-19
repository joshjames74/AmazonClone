import { Box } from "@chakra-ui/react";
import Navigation from "../../navigation";
import BasketCardWrapper from "../BasketCardWrapper";

export default function BasketPage(): JSX.Element {
  return (
    <Box>
      <Navigation />
      <BasketCardWrapper />
    </Box>
  );
}
