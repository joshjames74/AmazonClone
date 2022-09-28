import ProductForm from "../../views/components/form/ProductForm";
import Navigation from "../../views/components/navigation";
import { Box } from "@chakra-ui/react";
import { User } from "../../api/entities";
import { useContext, useEffect } from "react";
import { UserContext } from "../../views/contexts";
import { postUser } from "../../api/helpers/requests/user";

export default function AddProduct(): JSX.Element {
  const { user, loading } = useContext(UserContext);

  // useEffect(() => {
  //   if (!loading) {
  //     const userNew = new User();
  //     userNew.first_name = 'Joshua';
  //     userNew.image_url = '/';
  //     userNew.title = 'Mr';
  //     userNew.user_name = 'joshuaj';
  //     userNew.country = user.country;
  //     userNew.currency = user.currency;

  //     console.log(userNew);

  //     postUser(userNew).then(res => console.log(res));
  //   };
  // }, [loading]);

  return (
    <Box display="flex" flexDirection="column">
      <Navigation />
      <ProductForm />
    </Box>
  );
}
