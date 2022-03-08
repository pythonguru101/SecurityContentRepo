//@ts-check
import { extendTheme } from '@chakra-ui/react';
import foundations from './foundations';
import { mode } from '@chakra-ui/theme-tools';

const direction = 'ltr';

const config = {
    useSystemColorMode: false,
    initialColorMode: 'dark',
    cssVarPrefix: 'ckds'
};

export const theme = {
    direction,
    ...foundations,
    config
};

export default extendTheme(theme);
