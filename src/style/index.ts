import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import { css, withStyles } from 'react-with-styles';

export interface Theme {
    color: {
        primary: string;
        background: string;
    };
}

export const ThemeBasic: Theme = {
    color: {
        primary: '#f90',
        background: '#000',
    },
};

ThemedStyleSheet.registerTheme(ThemeBasic);
ThemedStyleSheet.registerInterface(aphroditeInterface);

export {
    css,
    withStyles,
    ThemedStyleSheet,
};