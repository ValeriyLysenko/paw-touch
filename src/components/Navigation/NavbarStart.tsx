import {
    FC, useRef,
} from 'react';
import { observer } from 'mobx-react';
import routes from 'routes';
import useMainMenuTools from 'hooks/useMainMenuTools';
import useMainMenuCanvas from 'hooks/useMainMenuCanvas';
import ModalPortal from 'atomicComponents/Modal/ModalPortal';
import SaveToGallery from 'components/Modals/SaveToGallery';
import NavMenuSection from './NavMenuSection';

interface Props {}

const NavbarStart: FC<Props> = observer(() => {
    const {
        canvas,
        layout,
        tools,
    } = routes;
    const saveToGalleryModalRef = useRef(null);
    const [
        clickNewCanvasHandler,
        clickClearCanvasHandler,
        clickDownloadCanvasHandler,
        clickSaveToGalleryCanvasHandler,
    ] = useMainMenuCanvas(saveToGalleryModalRef);
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
                <SaveToGallery ref={saveToGalleryModalRef} />
            </ModalPortal>
        </div>
    );
});

export default NavbarStart;
