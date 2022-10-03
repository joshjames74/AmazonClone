import ProductForm from "../../views/components/form/ProductForm";
import Navigation from "../../views/components/navigation";
import { Box } from "@chakra-ui/react";
import { User } from "../../api/entities";
import { useContext, useEffect } from "react";
import { UserContext } from "../../views/contexts";
import { postUser } from "../../api/helpers/requests/user";

export default function AddProduct(): JSX.Element {

  return (
    <Box display="flex" flexDirection="column">
      <Navigation />
      <ProductForm />
    </Box>
  );
}
