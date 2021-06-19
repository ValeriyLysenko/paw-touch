import {
    FC, useContext,
} from 'react';
import { observer } from 'mobx-react';
// import { useRouteMatch, useHistory } from 'react-router-dom';
import routes from 'routes';
import AppContext from 'aux/AppContext';
import enrichedModalComponent from 'hocs/modalComponent/enrichedModalComponent';
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
    // const routeMatchGallery = useRouteMatch('/gallery');
    // const history = useHistory();
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
    // enrichedModalComponent();
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

    // console.log('%cZZZZZZZZZZ', 'color: green', history);
    // console.log('%cZZZZZZZZZZ', 'color: blue', routeMatchGallery);
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
                {/* <SaveToGallery {...(routeMatchGallery && { callback: resetCanvasToDefaults })} /> */}
                <SaveToGallery {...saveToGalleryProps} />
            </ModalPortal>
            <ModalPortal>
                <SaveToGalleryPrompt />
            </ModalPortal>
        </div>
    );
});

export default NavbarStart;
