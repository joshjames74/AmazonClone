import { Box, Link, Image } from "@chakra-ui/react";
import { routes } from "../../../../api/routes";
import { LogoWrapperType } from "../types/LogoWrapperType";

export default function LogoWrapper(props: LogoWrapperType): JSX.Element {
  return (
    <Box
      as={Link}
      href={routes.base}
      overflow={"hidden"}
      maxW="12vh"
      w="20%"
      h="100%"
    >
      <Image
        src={props.imageUrl ? props.imageUrl : ""}
        alt={props.imageAlt ? props.imageAlt : ""}
      />
    </Box>
  );
}
