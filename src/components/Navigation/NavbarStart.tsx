import {
    FC, useContext,
} from 'react';
import { observer } from 'mobx-react';
import routes from 'routes';
import AppContext from 'aux/AppContext';
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
    const { mainCanvas } = useContext(AppContext);
    const modals = mainCanvas.getModals;
    const { type, parent } = modals;
    const [
        clickNewCanvasHandler,
        clickClearCanvasHandler,
        clickDownloadCanvasHandler,
        clickSaveToGalleryCanvasHandler,
        resetCanvasToDefaults,
    ] = useMainMenuCanvas();
    const clickToolsHandler = useMainMenuTools();
    const saveToGalleryProps: ModalsProps = {};

    switch (type) {
        case 'save-to-gallery': {
            if (parent === 'new-canvas') saveToGalleryProps.callback = resetCanvasToDefaults;
            break;
        }
        default: {
            break;
        }
    }

    console.log('%cmodals', 'color: blue', modals);

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
                <SaveToGallery {...saveToGalleryProps} />
            </ModalPortal>
            <ModalPortal>
                <SaveToGalleryPrompt />
            </ModalPortal>
        </div>
    );
});

export default NavbarStart;
