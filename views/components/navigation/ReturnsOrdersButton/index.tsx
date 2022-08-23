import { Button, Box } from '@chakra-ui/react';

export default function ReturnsOrdersButton(): JSX.Element {
    return (
        <Button
        marginRight='3px'>
            <Box
            display='flex'
            flexDirection='column'
            fontSize='xs'>
                <Box>Returns</Box>
                <Box>& Orders</Box>
            </Box>
        </Button>
    )
}