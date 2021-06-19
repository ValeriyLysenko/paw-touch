import {
    FC, useContext,
} from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import LayoutContext from 'aux/LayoutContext';
import useCanvasDrawing from 'hooks/useCanvasDrawing';
import StepControls from 'components/LayoutControls/StepControls';
import ToolSettings from 'components/Tools/ToolSettings';

interface Props {}

const BasicLayout: FC<Props> = observer(() => {
    console.log('%cBasicLayout', 'color: olive;');
    const { mainCanvas } = useContext(AppContext);
    const { canvasRef } = useContext(LayoutContext);
    const activeTool = mainCanvas.getActiveTool;
    const scale = mainCanvas.getScale;
    const auxData = mainCanvas.getAuxData;
    const history = mainCanvas.getHistory;
    const historySpec = mainCanvas.getHistorySpec;
    const modals = mainCanvas.getModals;

    useCanvasDrawing(
        toJS(activeTool),
        toJS(scale),
        toJS(auxData),
        {
            data: toJS(history),
            spec: toJS(historySpec),
        },
    );

    console.log('%cactiveTool ===>', 'color: red', activeTool);
    console.log('%cscale ===>', 'color: red', scale);
    console.log('%chistory ===>', 'color: red', history);
    console.log('%cmodals ===>', 'color: violet', modals);

    return (
        <div>
            <div className="pt-drawing-block">
                <div className="pt-canvas-container">
                    <div className="pt-canvas-container-inner">
                        <canvas id="pt-main-canvas" ref={canvasRef} />
                    </div>
                </div>
                <div className="pt-drawing-block-gap" />
                <ToolSettings />
            </div>
            <StepControls />
        </div>
    );

});

export default BasicLayout;
