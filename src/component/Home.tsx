import * as React from 'react';
import HeadNav from './HeadNav';
import Main from './Main';
import BottomNav from './BottomNav';

class Home extends React.Component {
    render() {
        return (
            <div>
                <HeadNav />
                <Main />
                <BottomNav />
            </div>
        );
    }
}

export default Home;
