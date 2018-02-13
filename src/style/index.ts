import ThemedStyleSheet from 'react-with-styles/lib/ThemedStyleSheet';
import aphroditeInterface from 'react-with-styles-interface-aphrodite';
import { css, withStyles } from 'react-with-styles';

export const Theme = {
    color: {
        primary: '#f90',
        background: '#000',
        fontPrimary: '#fff',
    },

    offset: {
        mainLeft: 30,
        mainRight: 30,
    },
};

ThemedStyleSheet.registerTheme(Theme);
ThemedStyleSheet.registerInterface(aphroditeInterface);

export {
    css,
    withStyles,
    ThemedStyleSheet,
};