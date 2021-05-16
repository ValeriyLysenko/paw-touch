import 'aux/listeners';
import StepControls from 'components/LayoutControls/StepControls';
import Navigation from 'components/Navigation';
import Layout from 'components/Layout';
import ToolsPanel from 'components/ToolsPanel';

function App() {
    return (
        <>
            <ToolsPanel />
            <section className="hero is-fullheight">
                <div className="hero-head">
                    <Navigation />
                </div>
                <div className="hero-body">
                    <Layout />
                </div>
                <div className="hero-foot">
                    <StepControls />
                </div>
            </section>
        </>
    );
}

export default App;
