import { ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import { Box, Menu, MenuList, MenuItem, InputGroup, Input, InputLeftAddon, InputRightAddon, MenuButton } from '@chakra-ui/react';
import { useContext } from 'react';
import { SettingsContext } from '../../../contexts/SettingsContext';
import { SearchBarType } from '../types/SearchBarType';

export default function SearchBar(props: SearchBarType): JSX.Element {

    const { categories } = useContext(SettingsContext);

    return (
        <InputGroup
        maxW='150vh'
        w='40%'
        marginRight='3px'
        >
            <Menu>
                <InputLeftAddon 
                as={MenuButton}
                maxW='20vh'
                w='10%'
                paddingX='3px'
                fontSize='xs'>
                    <Box
                    display='flex'
                    flexDirection='row'>
                        <p>All</p>
                        <ChevronDownIcon w='50%'/>
                    </Box>
                </InputLeftAddon>
                <MenuList>
                    {categories.map((v: string, i) => {
                        return <MenuItem key={i}>{v}</MenuItem>
                    })}
                </MenuList>
            </Menu>
            <Input
            type='search'
            placeholder='Search for anything...'
            paddingX='5px'
            textOverflow='ellipsis'
            fontSize='xs'
            bgColor='whiteAlpha.900'
            borderRadius='0'
            />
            <InputRightAddon
            paddingX='3px'>
                <SearchIcon />
            </InputRightAddon>
        </InputGroup>
    )
}