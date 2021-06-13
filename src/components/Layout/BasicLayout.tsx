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
import { resizeImage } from 'libs/lib';

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

    return (
        <div>
            <img id="imageBitmap" src="./f01223034d216d98d582c5557a3c1406.png" alt="" />
            <div id="previewImage" />
            <button onClick={async (e) => {
                e.stopPropagation();
                const el = document.getElementById('imageBitmap') as HTMLImageElement;
                const previewImageEl = document.getElementById('previewImage') as HTMLImageElement;
                if (!el) return;
                if (!previewImageEl) return;

                const previewImage = await resizeImage(el, {
                    width: 400,
                    height: 400,
                });
                const previewImage3 = await resizeImage(el, {
                    width: 400,
                    height: 400,
                }, false, true);
                const previewImage2 = await resizeImage(el, {
                    width: 400,
                    height: 400,
                }, true);
                previewImageEl.append(previewImage);
                previewImageEl.append(previewImage2);
                previewImageEl.append(previewImage3);
            }}
            >
                Click
            </button>
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
