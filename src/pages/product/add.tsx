import ProductForm from "../../views/components/form/ProductForm";
import Navigation from "../../views/components/navigation";
import { Box } from "@chakra-ui/react";

export default function AddProduct(): JSX.Element {
  return (
    <Box display="flex" flexDirection="column">
      <Navigation />
      <ProductForm />
    </Box>
  );
}
