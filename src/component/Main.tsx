import * as React from 'react';
import { css, withStyles, Theme } from '../style';

export interface MainStyle {
    Container: {};
    EpisodeTitle: {};
    EpisodeListContainer: {};
    EpisodeList: {};
    EpisodeItem: {};
    EpisodeItem__Highlight: {};
}

export interface MainProp {
    styles: MainStyle;
}

function Main({ styles }: MainProp) {
    return (
        <div {...css(styles.Container)}>
            <h1 {...css(styles.EpisodeTitle)}>Main</h1>
            <div {...css(styles.EpisodeListContainer)}>
                <ul {...css(styles.EpisodeList)}>
                    <li {...css(styles.EpisodeItem)} />
                    <li {...css(styles.EpisodeItem)} />
                    <li {...css(styles.EpisodeItem)} />
                    <li {...css(styles.EpisodeItem, styles.EpisodeItem__Highlight)} />
                    <li {...css(styles.EpisodeItem)} />
                    <li {...css(styles.EpisodeItem)} />
                    <li {...css(styles.EpisodeItem)} />
                </ul>
            </div>
        </div>
    );
}

export default withStyles(({
    color,
    offset,
}: typeof Theme): MainStyle => ({
    Container: {
        marginLeft: offset.mainLeft,
    },

    EpisodeTitle: {
        color: '#fff',
        display: 'block',
        fontSize: '30px',
        fontWeight: 'normal',
    },

    EpisodeListContainer: {
        overflow: 'auto',
    },

    EpisodeList: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',

        overflow: 'hidden',
        whiteSpace: 'nowrap',
        marginRight: '-999rem',  // TODO: calc on the fly
    },

    EpisodeItem: {
        display: 'block',
        width: 300,
        height: 300,
        marginRight: 15,
        border: `1px solid ${color.primary}`,
    },

    EpisodeItem__Highlight: {
        width: 350,
        height: 350,
    },
}))(Main);