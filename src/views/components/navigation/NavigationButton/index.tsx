import { Box } from "@chakra-ui/react";

export default function NavigationButton({ children }): JSX.Element {
  return <Box _hover={{ color: "blue" }}>{children}</Box>;
}
