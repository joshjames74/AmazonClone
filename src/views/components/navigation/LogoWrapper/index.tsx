import { Box, Link, Image } from "@chakra-ui/react";
import { routes } from "../../../../api/routes";
import { LogoWrapperType } from "../types/LogoWrapperType";
import { FaHome } from "react-icons/fa";

export default function LogoWrapper(props: LogoWrapperType): JSX.Element {
  return (
    <Box
      as={Link}
      href={routes.base}
      w="fit-content"
      h="fit-content"
      paddingX="0.3em"
      fontSize="5xl"
    >
      <FaHome />
    </Box>
  );
}
