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
    const [
        clickNewCanvasHandler,
        clickClearCanvasHandler,
        clickDownloadCanvasHandler,
        clickSaveToGalleryCanvasHandler,
        resetCanvasToDefaults,
    ] = useMainMenuCanvas();
    const clickToolsHandler = useMainMenuTools();
    const {
        type: saveToGalleryType = '',
        parent: saveToGalleryParent = '',
    } = modals.saveToGallery || {};
    const {
        type: newCanvasType = '',
    } = modals.newCanvas || {};
    const saveToGalleryProps: ModalsProps = {};

    if (saveToGalleryType) {
        if (saveToGalleryParent === 'new-canvas') saveToGalleryProps.callback = resetCanvasToDefaults;
    }

    console.log('%cmodals', 'color: blue', modals, newCanvasType);

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
            {
                saveToGalleryType ? (
                    <ModalPortal>
                        <SaveToGallery {...saveToGalleryProps} />
                    </ModalPortal>
                ) : null
            }
            {
                newCanvasType ? (
                    <ModalPortal>
                        <SaveToGalleryPrompt callback={resetCanvasToDefaults} />
                    </ModalPortal>
                ) : null
            }
        </div>
    );
});

export default NavbarStart;
