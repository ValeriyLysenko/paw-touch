import {
    FC, useRef,
} from 'react';
import { LayoutContextProvider } from 'aux/LayoutContext';
import Navigation from 'components/Navigation';
import Layout from 'components/Layout';
import ToolsPanel from 'components/ToolsPanel';

interface Props {}

const App: FC<Props> = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const modalsWrapperRef = useRef<HTMLDivElement | null>(null);
    const modals = {
        saveToGalleryModalRef: useRef<HTMLDivElement | null>(null),
        saveToGalleryPropmptModalRef: useRef<HTMLDivElement | null>(null),
        galleryPopupModalRef: useRef<HTMLDivElement | null>(null),
    };
    return (
        <LayoutContextProvider value={{
            canvasRef, modalsWrapperRef, modals,
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
                    <Layout />
                </main>
                <footer />
            </div>
        </LayoutContextProvider>
    );
};

export default App;
