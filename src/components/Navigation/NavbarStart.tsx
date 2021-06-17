import {
    FC,
} from 'react';
import { observer } from 'mobx-react';
import routes from 'routes';
import useMainMenuTools from 'hooks/useMainMenuTools';
import useMainMenuCanvas from 'hooks/useMainMenuCanvas';
import ModalPortal from 'atomicComponents/Modal/ModalPortal';
import SaveToGallery from 'components/Modals/SaveToGallery';
import SaveToGalleryPrompt from 'components/Modals/SaveToGalleryPrompt';
import NavMenuSection from './NavMenuSection';

interface Props {}

const NavbarStart: FC<Props> = observer(() => {
    const {
        canvas,
        layout,
        tools,
    } = routes;
    const [
        clickNewCanvasHandler,
        clickClearCanvasHandler,
        clickDownloadCanvasHandler,
        clickSaveToGalleryCanvasHandler,
        resetCanvasToDefaults,
    ] = useMainMenuCanvas();
    const clickToolsHandler = useMainMenuTools();

    return (
        <div className="navbar-start">
            <NavMenuSection
                routes={canvas}
                handlers={{
                    newCanvas: clickNewCanvasHandler,
                    clearCanvas: clickClearCanvasHandler,
                    downloadCanvas: clickDownloadCanvasHandler,
                    saveToGallery: clickSaveToGalleryCanvasHandler,
                }}
            />
            <NavMenuSection routes={layout} />
            <NavMenuSection handlers={{ tools: clickToolsHandler }} routes={tools} />
            <ModalPortal>
                <SaveToGallery callback={resetCanvasToDefaults} />
            </ModalPortal>
            <ModalPortal>
                <SaveToGalleryPrompt callback={resetCanvasToDefaults} />
            </ModalPortal>
        </div>
    );
});

export default NavbarStart;
