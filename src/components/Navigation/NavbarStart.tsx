import {
    FC,
} from 'react';
import { observer } from 'mobx-react';
import routes from 'routes';
import useMainMenuTools from 'hooks/useMainMenuTools';
import useMainMenuCanvas from 'hooks/useMainMenuCanvas';
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
                }}
            />
            <NavMenuSection routes={layout} />
            <NavMenuSection handlers={{ tools: clickToolsHandler }} routes={tools} />
        </div>
    );
});

export default NavbarStart;
