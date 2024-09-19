'use-client';
import {
  Menu,
  MenuList,
  MenuButton,
  Button,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import NavigationButton from "../NavigationButton";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import Image from "next/image";
import { useAuth0 } from '@auth0/auth0-react';


export default function AccountButton(): JSX.Element {
  
  const { user, error, isLoading } = useUser();

  const loggedInButton = (): JSX.Element => {
    return (
      <NavigationButton>
        <Box 
        w="12vh">
          <Menu>
            <MenuButton 
              as={Button}
              href={"/"}
              paddingX="5px"
              w="100%"
              >
              <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              >
                <Box
                width="30%"
                display="flex"
                alignItems="center"
                borderRadius="50%"
                overflow="hidden">
                  <Image 
                  src={user?.picture ? user.picture : "/"} 
                  width="100%"
                  height="100%"
                  objectFit="contain"
                  />
                </Box>
                <Box fontSize="xs">Account</Box>
              </Box>
            </MenuButton>
            <MenuList fontSize="xs">
              <MenuItem>Orders</MenuItem>
              <MenuItem>Account</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>
                <Link href="/api/auth/logout">Log Out</Link>
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </NavigationButton>
    );
  };

  const loggedOutButton = (): JSX.Element => {
    return <Link href={"/api/auth/login"}>Log in</Link>;
  };

  const renderBody = (): JSX.Element => {
    if (isLoading) {
      return <></>
    }
    if (user) {
      return loggedInButton();
    }
    if (!user) {
      return loggedOutButton();
    }
    return <></>
  };

  return renderBody();
}
