import {
    FC,
} from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import BasicLayout from './BasicLayout';
import AuxLayout from './AuxLayout';
import GalleryLayout from './GalleryLayout';
import FullscreenLayout from './FullscreenLayout';

interface Props {}

const Layout: FC = (props: Props) => {
    const basicLayoutPath = ['/'];
    return (
        <Switch>
            <Route exact path={basicLayoutPath}>
                <BasicLayout />
            </Route>
            <Route path="/vertical-split">
                <AuxLayout
                    spec={{
                        type: 'vertical',
                    }}
                />
            </Route>
            <Route path="/horizontal-split">
                <AuxLayout
                    spec={{
                        type: 'horizontal',
                    }}
                />
            </Route>
            <Route path="/gallery">
                <GalleryLayout />
            </Route>
            <Route path="/fullscreen">
                <FullscreenLayout />
            </Route>
        </Switch>
    );
};

export default Layout;
