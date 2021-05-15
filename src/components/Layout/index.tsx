import {
    FC,
} from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import StepControls from 'components/LayoutControls/StepControls';
import FullscreenControls from 'components/LayoutControls/FullscreenControls';
import CanvasStore from 'stores/CanvasStore';
import BasicLayout from './BasicLayout';
import AuxLayout from './AuxLayout';

interface Props {}

const mainCanvas = new CanvasStore();
const auxCanvas = new CanvasStore();

const Layout: FC = (props: Props) => {
    console.log('%cLayout', 'color: green;');
    const basicLayoutPath = ['/', '/layout', '/tools', '/new-canvas', '/canvas'];
    return (
        <Switch>
            <Route exact path={basicLayoutPath}>
                <BasicLayout mainCanvas={mainCanvas} />
            </Route>
            <Route path="/vertical-split">
                <AuxLayout
                    mainCanvas={mainCanvas}
                    auxCanvas={auxCanvas}
                    spec={{
                        id: 'pt-canvas-container-vertical',
                        cssClass: 'pt-vertical-split',
                    }}
                />
            </Route>
            <Route path="/horizontal-split">
                <AuxLayout
                    mainCanvas={mainCanvas}
                    auxCanvas={auxCanvas}
                    spec={{
                        id: 'pt-canvas-container-horizontal',
                        cssClass: 'pt-horizontal-split',
                    }}
                />
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
