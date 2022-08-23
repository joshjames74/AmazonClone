import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { HStack, InputGroup, Input, InputLeftAddon, InputRightAddon } from '@chakra-ui/react';
import { SearchBarType } from './types';

export default function SearchBar(props: SearchBarType): JSX.Element {
    return (
        <InputGroup w={'10%'}>
            <InputLeftAddon 
            children={
                <HStack>
                    {'All'}
                    {/* <ChevronDownIcon /> */}
                </HStack>
            }
            />
            <Input type='search' placeholder='Search for anything...' />
            <InputRightAddon
            // children={
            //     {/* <SearchIcon /> */}
            // }
            />
        </InputGroup>
    )
}