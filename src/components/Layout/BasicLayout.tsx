import {
    FC, useContext,
} from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import { LayoutContextProvider } from 'aux/LayoutContext';
import useCanvasDrawing from 'hooks/useCanvasDrawing';
import StepControls from 'components/LayoutControls/StepControls';
import ToolSettings from 'components/Tools/ToolSettings';

interface Props {}

const BasicLayout: FC<Props> = observer(() => {
    console.log('%cBasicLayout', 'color: olive;');
    const { mainCanvas } = useContext(AppContext);
    const activeTool = mainCanvas.getActiveTool;
    const auxData = mainCanvas.getAuxData;
    const history = mainCanvas.getHistory;
    const historySpec = mainCanvas.getHistorySpec;
    const [canvasRef] = useCanvasDrawing(
        toJS(activeTool), toJS(auxData), {
            data: toJS(history),
            spec: toJS(historySpec),
        },
    );

    // console.log('%c===>', 'color: red', mainCanvas.getHistory);
    // console.log('%c===>', 'color: red', activeTool.scale);
    // console.log('%c===>', 'color: red', auxData.ctrlKey);

    return (
        <LayoutContextProvider value={{ canvasRef }}>
            <div className="pt-drawing-block">
                <div id="pt-canvas-container" className="pt-canvas-container">
                    <canvas id="pt-main-canvas" ref={canvasRef} />
                </div>
                <div className="pt-drawing-block-gap" />
                <ToolSettings />
            </div>
            <StepControls />
        </LayoutContextProvider>
    );

});

export default BasicLayout;
