import { Box } from "@chakra-ui/react";
import { LoginForm } from "../../views/components/loginForm";
import Navigation from "../../views/components/navigation";

export default function LoginPage(): JSX.Element {
    return (
        <Box>
            <Navigation />
            <LoginForm />
        </Box>
    )
}