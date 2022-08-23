import { Box, Image } from '@chakra-ui/react';
import { LogoWrapperType } from '../types/LogoWrapperType';

export default function LogoWrapper(props: LogoWrapperType): JSX.Element {
    return (
        <Box 
        overflow={'hidden'}
        maxW='12vh'
        w='20%'
        h='100%'>
            <Image 
            src={props.imageURL ? props.imageURL : ''}
            alt={props.imageAlt ? props.imageAlt : ''} 
            />
        </Box>
    )
}