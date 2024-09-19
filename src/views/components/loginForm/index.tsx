import { Box, Input, FormLabel, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import styles from "./index.module.css";


export function LoginForm(): JSX.Element {

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onChangeUsername = (event: React.BaseSyntheticEvent) => {
        setUsername(event.target.value);
    }

    const onChangePassword = (event: React.BaseSyntheticEvent) => {
        setPassword(event.target.value);
    }

    return (

        <Box className={styles.wrapper}>
            <Box className={styles.form_container}>
                <Box className={styles.input_wrapper}>
                    <FormLabel className={styles.label}>
                        Username
                    </FormLabel>
                    <Input type="text" onChange={onChangeUsername} />
                </Box>
                <Box className={styles.input_wrapper}>
                    <FormLabel className={styles.label}>
                        Password
                    </FormLabel>
                    <Input type="password" onChange={onChangePassword}/>
                </Box>
            </Box>
            <Box className={styles.button_wrapper}>
                <Button>Submit</Button>
                <Button>Cancel</Button>
            </Box>
        </Box>

    )

} 