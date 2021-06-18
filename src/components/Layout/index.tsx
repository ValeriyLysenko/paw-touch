import {
    FC,
} from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import StepControls from 'components/LayoutControls/StepControls';
import FullscreenControls from 'components/LayoutControls/FullscreenControls';
import BasicLayout from './BasicLayout';
import AuxLayout from './AuxLayout';
import GalleryLayout from './GalleryLayout';

interface Props {}

const Layout: FC = (props: Props) => {
    console.log('%cLayout', 'color: green;');
    const basicLayoutPath = ['/', '/layout', '/tools', '/new-canvas', '/canvas'];
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
                <div className="pt-on-top pt-on-top-canvas">
                    <div className="pt-navbar pt-navbar-top">
                        <FullscreenControls />
                    </div>
                    <div className="pt-canvas-container"><canvas /></div>
                    <div className="pt-navbar pt-navbar-bottom">
                        <StepControls />
                    </div>
                </div>
            </Route>
        </Switch>
    );

};

export default Layout;
