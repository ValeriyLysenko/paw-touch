// @ts-nocheck
import {
    FC, useContext,
} from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react-lite';
import AppContext from 'aux/AppContext';
import useCanvasDrawing from 'hooks/useCanvasDrawing';
import StepControls from 'components/LayoutControls/StepControls';
import ToolSettings from 'components/Tools/ToolSettings';

interface Props {}

const BasicLayout: FC<Props> = observer(() => {
    console.log('%cBasicLayout', 'color: olive;');
    const { mainCanvas } = useContext(AppContext);
    const activeTool = mainCanvas.getActiveTool;
    const [canvasRef] = useCanvasDrawing(toJS(activeTool));

    console.log('%c===>', 'color: red', activeTool.scale);

    return (
        <div className="pt-drawing-block">
            <div id="pt-canvas-container" className="pt-canvas-container">
                <canvas id="pt-main-canvas" ref={canvasRef} />
            </div>
            <div className="pt-drawing-block-gap" />
            {/* <StepControls /> */}
            <ToolSettings />
        </div>
    );

});

export default BasicLayout;
