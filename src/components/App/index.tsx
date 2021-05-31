import {
    FC,
} from 'react';
// import StepControls from 'components/LayoutControls/StepControls';
import Navigation from 'components/Navigation';
import Layout from 'components/Layout';
import ToolsPanel from 'components/ToolsPanel';

interface Props {}

const App: FC<Props> = () => (
    <>
        <div id="pt-draggable-wrapper">
            <ToolsPanel />
        </div>
        <div id="pt-modals-wrapper" />
        <div id="pt-page-wrapper">
            <header>
                <Navigation />
            </header>
            <main>
                <Layout />
            </main>
            <footer>
                {/* <StepControls /> */}
            </footer>
        </div>
    </>
);

export default App;
