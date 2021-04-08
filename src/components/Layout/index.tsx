import {
    FC,
} from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';

interface Props {}

const Layout: FC = (props: Props) => {
    console.log('%cLayout', 'color: green;');
    const basicLayoutPath = ['/layout', '/tools', '/new-canvas', '/canvas'];
    return (
        <Switch>
            {/* <Route path="/new">
                <div id="pt-container">
                    <div>XXXXXXXXXXXXXXxxx</div>
                </div>
            </Route> */}
            <Route exact path="/">
                HOme
                <div id="pt-canvas-container"><canvas /></div>
            </Route>
            <Route path="/vertical-split">
                sp
                <div id="pt-canvas-container"><canvas /></div>
            </Route>
            <Route path="/horizontal-split">
                sp
                <div id="pt-canvas-container"><canvas /></div>
            </Route>
            <Route path="/fullscreen">
                sp
                <div id="pt-canvas-container"><canvas /></div>
            </Route>
            <Route path={basicLayoutPath}>
                <div id="pt-canvas-container"><canvas /></div>
            </Route>
        </Switch>
    );

};

export default Layout;
