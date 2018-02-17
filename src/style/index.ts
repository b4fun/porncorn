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

    EpisodeItem: {
        marginRight: 15,
        width: 300,
        height: 300,
        highlightWidth: 350,
        highlightHeight: 350,
    },
};

ThemedStyleSheet.registerTheme(Theme);
ThemedStyleSheet.registerInterface(aphroditeInterface);

export {
    css,
    withStyles,
    ThemedStyleSheet,
};