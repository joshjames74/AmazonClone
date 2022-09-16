import { Button, Box } from "@chakra-ui/react";

export default function ReturnsButton(): JSX.Element {
  return (
    <Button marginRight="3px">
      <Box display="flex" flexDirection="column" fontSize="xs">
        <Box>Orders</Box>
      </Box>
    </Button>
  );
}
