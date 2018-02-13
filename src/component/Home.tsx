import * as React from 'react';
import { css, withStyles } from '../style';
import HeadNav from './HeadNav';
import Main from './Main';
import BottomNav from './BottomNav';

export interface HomeStyle {
    Home: {};
    HeadNav: {};
    Main: {};
    BottomNav: {};
}

export interface HomeProp {
    styles: HomeStyle;
}

function Home({ styles }: HomeProp) {
    console.log(styles);
    return (
        <div {...css(styles.Home)}>
            <div {...css(styles.HeadNav)}>
                <HeadNav />
            </div>
            <div {...css(styles.Main)}>
                <Main />
            </div>
            <div {...css(styles.BottomNav)}>
                <BottomNav />
            </div>
        </div>
    );
}

export default withStyles((): HomeStyle => ({
    Home: {
        height: '100vh',
        display: 'grid',
        gridTemplateColumns: 'auto',
        gridTemplateRows: '10% auto 10%',
    },

    HeadNav: {
        gridRowStart: '1',
        gridRowEnd: '1',
    },

    Main: {
        gridRowStart: '2',
        gridRowEnd: '2',
    },

    BottomNav: {
        gridRowStart: '3',
        gridRowEnd: '3',
    },
}))(Home);
