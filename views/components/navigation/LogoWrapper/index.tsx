import { Box, Image } from '@chakra-ui/react';
import { LogoWrapperType } from './types';

export default function LogoWrapper(props: LogoWrapperType): JSX.Element {
    return (
        <Box w='10px' overflow={'hidden'}>
            <Image 
            src={props.imageURL ? props.imageURL : ''}
            alt={props.imageAlt ? props.imageAlt : ''} />
        </Box>
    )
}