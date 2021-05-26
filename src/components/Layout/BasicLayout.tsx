import {
    FC, useContext,
} from 'react';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import useCanvasDrawing from 'hooks/useCanvasDrawing';
import StepControls from 'components/LayoutControls/StepControls';

import ToolSettings from 'components/Tools/ToolSettings';

interface Props {}

const BasicLayout: FC<Props> = observer(() => {
    console.log('%cBasicLayout', 'color: olive;');
    const { mainCanvas } = useContext(AppContext);
    const { type, spec } = mainCanvas.getActiveTool;
    const { size, color } = spec;
    const [canvasRef] = useCanvasDrawing({ type, color, size });

    return (
        <div className="pt-drawing-block">
            <div id="pt-canvas-container" className="pt-canvas-container">
                <canvas ref={canvasRef} />
            </div>
            <div className="pt-drawing-block-gap" />
            {/* <StepControls /> */}
            <ToolSettings />
        </div>
    );

});

export default BasicLayout;
