import {
    FC, useRef, ReactNode,
} from 'react';
import { LayoutContextProvider } from 'aux/LayoutContext';
import Navigation from 'components/Navigation';
import Layout from 'components/Layout';
import ToolsPanel from 'components/ToolsPanel';

interface Props {
    children?: ReactNode;
}

const App: FC<Props> = ({ children }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const modalsWrapperRef = useRef<HTMLDivElement | null>(null);
    const galleryFormRef = useRef<HTMLFormElement | null>(null);
    const modals = {};
    return (
        <LayoutContextProvider value={{
            canvasRef, modalsWrapperRef, galleryFormRef, modals,
        }}
        >
            <div id="pt-draggable-wrapper">
                <ToolsPanel />
            </div>
            <div id="pt-modals-wrapper" ref={modalsWrapperRef} />
            <div id="pt-page-wrapper">
                <header>
                    <Navigation />
                </header>
                <main>
                    {
                        children || ( // !For testing purpose only!!!
                            <Layout />
                        )
                    }
                </main>
                <footer />
            </div>
        </LayoutContextProvider>
    );
};

export default App;
