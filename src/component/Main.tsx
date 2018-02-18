import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as faPlayCircle from '@fortawesome/fontawesome-free-regular/faPlayCircle';
import scrollIntoViewIfNeeded from 'scroll-into-view-if-needed';
import { css, withStyles, Theme, ThemedStyleSheet } from '../style';

interface EpisodeItemStyle {
    Item: {};
    ItemHighlight: {};
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
    onClick: (_: Episode) => void;
}

const EpisodeItem = withStyles(({
    color,
    EpisodeItem: { width, height, highlightWidth, highlightHeight, marginRight },
}: typeof Theme): EpisodeItemStyle => ({
    Item: {
        display: 'block',
        width,
        height,
        marginRight,
        border: `1px solid ${color.primary}`,
        backgroundSize: 'cover',
    },

    ItemHighlight: {
        width: highlightWidth,
        height: highlightHeight,
    },
}))(({ styles, episode, highlight, onClick }: EpisodeItemProp) => {
    const styleBgUrl = {
        background: `url(${episode.Cover})`,
    };

    if (highlight) {
        return (
            <li {...css(styles.Item, styles.ItemHighlight, styleBgUrl)} onClick={(e) => onClick(episode)} />
        );
    } else {
        return (
            <li {...css(styles.Item, styleBgUrl)} onClick={(e) => onClick(episode)} />
        );
    }
});

interface ControllerStyle {
    Container: {};
    ActionButton: {};
    ActionIcon: {};
}

interface ControllerProp {
    styles: ControllerStyle;
    enabled: boolean;
}

const Controller = withStyles(({ color }: typeof Theme): ControllerStyle => ({
    Container: {
        display: 'flex',
        width: '50%',
        margin: '25px auto 0',
        padding: 0,
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },

    ActionButton: {
        alignSelf: 'center',
        margin: '0 auto',
    },

    ActionIcon: {
        color: color.primary,
    },
}))(({ styles, enabled }: ControllerProp) => {
    if (enabled) {
        return (
            <ul {...css(styles.Container)}>
                <li {...css(styles.ActionButton)}>
                    <a href="#">
                        <FontAwesomeIcon
                          icon={faPlayCircle}
                          size="3x"
                          {...css(styles.ActionIcon)}
                        />
                    </a>
                </li>
            </ul>
        );
    } else {
        return null;
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
    loading: boolean;
    selectedEpisode?: Episode;
    episodes: Episode[];
}

class Main extends React.Component<MainProp, MainState> {

    setSelectedEpisodeFn: (_: Episode) => void;

    public constructor(props: MainProp) {
        super(props);

        this.state = {
            loading: false,
            episodes: [],
        };

        this.setSelectedEpisodeFn = (eps: Episode) => {
            this.setState({
                selectedEpisode: eps,
            });
        };
    }

    public componentDidMount() {
        this.setState({
            loading: true,
        });

        setTimeout(
            () => {
                const episodes = [
                    {
                        Id: 'SOE-901',
                        Name: 'SOE-901',
                        Cover: 'https://img1.doubanio.com/icon/ul92463871-8.jpg',
                    },
                    {
                        Id: 'SOE-902',
                        Name: 'SOE-902',
                        Cover: 'https://img1.doubanio.com/icon/ul92463871-8.jpg',
                    },
                    {
                        Id: 'SOE-903',
                        Name: 'SOE-903',
                        Cover: 'https://img1.doubanio.com/icon/ul92463871-8.jpg',
                    },
                    {
                        Id: 'SOE-904',
                        Name: 'SOE-904',
                        Cover: 'https://img1.doubanio.com/icon/ul92463871-8.jpg',
                    },
                    {
                        Id: 'SOE-905',
                        Name: 'SOE-905',
                        Cover: 'https://img1.doubanio.com/icon/ul92463871-8.jpg',
                    },
                    {
                        Id: 'SOE-906',
                        Name: 'SOE-905',
                        Cover: 'https://img1.doubanio.com/icon/ul92463871-8.jpg',
                    },
                    {
                        Id: 'SOE-907',
                        Name: 'SOE-905',
                        Cover: 'https://img1.doubanio.com/icon/ul92463871-8.jpg',
                    },
                ];
                this.setState({
                    loading: false,
                    selectedEpisode: episodes[0],
                    episodes,
                });
            },
            Math.ceil(Math.random() * 10000) / 10,
        );
    }

    public componentDidUpdate() {
        const selectedEpisode = this.state.selectedEpisode;
        if (selectedEpisode) {
            const node = ReactDOM.findDOMNode(this.refs[selectedEpisode.Id]);
            if (node) {
                scrollIntoViewIfNeeded(node, {
                    centerIfNeeded: true,
                    duration: 150,
                    easing: 'easeIn',
                    offset: {
                        right: 15,
                    },
                });
            }
        }
    }

    public render() {
        const { selectedEpisode, episodes, loading } = this.state;

        const styles = this.props.styles;
        const stylesEpisodeList = {
            marginRight: 0,
        };
        const theme = ThemedStyleSheet.get();
        let episodeListWidth = theme.EpisodeItem.width * episodes.length;
        if (selectedEpisode) {
            episodeListWidth = episodeListWidth - episodes.length + theme.EpisodeItem.highlightWidth;
        }
        if (episodeListWidth <= window.innerWidth) {
            stylesEpisodeList.marginRight = 0;
        } else {
            stylesEpisodeList.marginRight = - (episodeListWidth - theme.EpisodeItem.width);
        }

        const episodeItems = episodes.map((episode): JSX.Element => {
            const key = `eps-${episode.Id}`;
            const highlight = (selectedEpisode && episode.Id === selectedEpisode.Id);
            return (
                <EpisodeItem
                  key={key}
                  ref={episode.Id}
                  episode={episode}
                  highlight={highlight}
                  onClick={this.setSelectedEpisodeFn}
                  onTouchEnd={this.setSelectedEpisodeFn}
                />
            );
        });

        let title = '';
        if (selectedEpisode) {
            title = selectedEpisode.Name;
        } else if (loading) {
            title = '加载中...';
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
                <Controller enabled={!!selectedEpisode} />
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