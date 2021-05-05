import {
    FC,
} from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import StepControls from 'components/LayoutControls/StepControls';
import FullscreenControls from 'components/LayoutControls/FullscreenControls';

interface Props {}

const Layout: FC = (props: Props) => {
    console.log('%cLayout', 'color: green;');
    const basicLayoutPath = ['/', '/layout', '/tools', '/new-canvas', '/canvas'];
    return (
        <Switch>
            <Route exact path={basicLayoutPath}>
                Home
                <div id="pt-canvas-container" className="pt-canvas-container"><canvas /></div>
            </Route>
            <Route path="/vertical-split">
                <div id="pt-canvas-container-vertical" className="pt-canvas-container-split pt-vertical-split">
                    <div><canvas /></div>
                    <div />
                    <div><canvas /></div>
                </div>
            </Route>
            <Route path="/horizontal-split">
                <div id="pt-canvas-container-horizontal" className="pt-canvas-container-split pt-horizontal-split">
                    <div><canvas /></div>
                    <div />
                    <div><canvas /></div>
                </div>
            </Route>
            <Route path="/fullscreen">
                <div className="pt-on-top pt-on-top-canvas">
                    <div className="pt-navbar pt-navbar-top">
                        <FullscreenControls />
                    </div>
                    <div id="pt-canvas-container" className="pt-canvas-container"><canvas /></div>
                    <div className="pt-navbar pt-navbar-bottom">
                        <StepControls />
                    </div>
                </div>
            </Route>
        </Switch>
    );

};

export default Layout;
