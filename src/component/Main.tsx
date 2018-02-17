import * as React from 'react';
import { css, withStyles, Theme, ThemedStyleSheet } from '../style';

interface EpisodeItemStyle {
    EpisodeItem: {};
    EpisodeItem__Highlight: {};
}

interface Episode {
    Id: string;
    Name: string;
    Cover: string;
}

interface EpisodeItemProp {
    styles: EpisodeItemStyle;
    episode: Episode;
    highlight?: boolean;
}

const EpisodeItem = withStyles(({
    color,
    EpisodeItem: { width, height, highlightWidth, highlightHeight, marginRight },
}: typeof Theme): EpisodeItemStyle => ({
    EpisodeItem: {
        display: 'block',
        width,
        height,
        marginRight,
        border: `1px solid ${color.primary}`,
    },

    EpisodeItem__Highlight: {
        width: highlightWidth,
        height: highlightHeight,
    },
}))(({ styles, episode, highlight }: EpisodeItemProp) => {
    if (highlight) {
        return (
            <li {...css(styles.EpisodeItem, styles.EpisodeItem__Highlight)}>{episode.Name}</li>
        );
    } else {
        return (
            <li {...css(styles.EpisodeItem)}>{episode.Name}</li>
        );
    }
});

export interface MainStyle {
    Container: {};
    EpisodeTitle: {};
    EpisodeListContainer: {};
    EpisodeList: {};
}

export interface MainProp {
    styles: MainStyle;
}

export interface MainState {
    selectedEpisode?: Episode;
    episodes: Episode[];
}

class Main extends React.Component<MainProp, MainState> {

    public constructor(props: MainProp) {
        super(props);

        this.state = {
            episodes: [],
        };
    }

    public componentDidMount() {
        console.log('componentDidMount');
    }

    public render() {
        const { selectedEpisode, episodes } = this.state;

        const styles = this.props.styles;
        const stylesEpisodeList = {
            marginRight: 0,
        };
        const episodeItemWidth = ThemedStyleSheet.get().EpisodeItem.width;
        const episodeListWidth = episodeItemWidth * episodes.length;
        if (episodeListWidth <= window.innerWidth) {
            stylesEpisodeList.marginRight = 0;
        } else {
            stylesEpisodeList.marginRight = -(episodeListWidth - episodeItemWidth);
        }

        const episodeItems = episodes.map((episode): JSX.Element => {
            const key = `eps-${episode.Id}`;
            const highlight = (selectedEpisode && episode.Id === selectedEpisode.Id);
            return (
                <EpisodeItem key={key} episode={episode} highlight={highlight} />
            );
        });

        let title = '';
        if (selectedEpisode) {
            title = selectedEpisode.Name;
        } else {
            title = `${episodes.length} 个结果`;
        }

        return (
            <div {...css(styles.Container)}>
                <h1 {...css(styles.EpisodeTitle)}>{title}</h1>
                <div {...css(styles.EpisodeListContainer)}>
                    <ul {...css(styles.EpisodeList, stylesEpisodeList)}>
                        {episodeItems}
                    </ul>
                </div>
            </div>
        );
    }
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
    },
}))(Main);