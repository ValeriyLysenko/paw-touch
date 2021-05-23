import { mainCanvas } from 'aux/init';
import 'aux/listeners';
// import StepControls from 'components/LayoutControls/StepControls';
import Navigation from 'components/Navigation';
import Layout from 'components/Layout';
import ToolsPanel from 'components/ToolsPanel';

function App() {
    return (
        <>
            <ToolsPanel mainCanvas={mainCanvas} />
            <div className="pt-page-wrapper">
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
}

export default App;
