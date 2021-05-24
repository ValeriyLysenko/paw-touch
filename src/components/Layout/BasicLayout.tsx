import {
    FC, useCallback, useContext, useEffect, useRef,
} from 'react';
import { observer } from 'mobx-react';
import { Subscription } from 'rxjs';
import AppContext from 'aux/AppContext';
import {
    createDrawTool,
} from 'libs/canvasLib';
import {
    resizeCanvasToDisplaySize,
} from 'libs/lib';
import StepControls from 'components/LayoutControls/StepControls';
import ToolSettings from 'components/Tools/ToolSettings';

interface Props {}

const BasicLayout: FC<Props> = observer(() => {
    // console.log('%cBasicLayout', 'color: green;', mainCanvas);
    const { mainCanvas } = useContext(AppContext);
    const canvasSize = mainCanvas.getMainCanvasSize;
    const { type, spec } = mainCanvas.getActiveTool;
    const { size, color } = spec;
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasInstRef = useRef<CanvasInstanceCreator | null>(null);
    const canvasSubRef = useRef<Subscription | null>(null);
    const manageCanvasSise = useCallback((command?: string): void => {
        const { current: canvasEl } = canvasRef;

        if (!canvasEl) return;

        switch (command) {
            case 'createDrawTool': {
                // Accord drawingBuffer / display pixels
                resizeCanvasToDisplaySize(canvasEl);
                console.log('%cBefore createDrawTool', 'color: blue');
                canvasInstRef.current = createDrawTool(canvasEl);
                break;
            }
            case 'setCanvasSize': {
                const ctx = canvasEl.getContext('2d');

                if (!ctx) break;
                // Backup canvas
                // const canvasBackup = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);

                // Accord drawingBuffer / display pixels
                // resizeCanvasToDisplaySize(canvasEl);

                // !TODO Adequate canvas resize implementation
                // const ratio = Math.min(
                //     canvasEl.width / wrapperEl.clientWidth,
                //     canvasEl.height / wrapperEl.clientHeight,
                // );
                // ctx.scale(ratio, ratio);

                // Restore canvas
                // ctx.putImageData(canvasBackup, 0, 0);
                break;
            }
            default: {
                break;
            }
        }
    }, []);

    useEffect(() => {
        console.log('%cuseEffect#1', 'color: blue');
        manageCanvasSise('createDrawTool');
    }, [manageCanvasSise]);

    useEffect(() => {
        console.log('%cuseEffect#2', 'color: red');
        manageCanvasSise('setCanvasSize');
    }, [canvasSize, manageCanvasSise]);

    useEffect(() => {
        console.log('%cuseEffect#3', 'color: green', type);
        const { current: canvasEl } = canvasRef;
        const { current: canvasInst } = canvasInstRef;

        if (!canvasEl) return;
        if (!canvasInst) return;
        console.log('%cBefore get subscription', 'color: green');

        canvasSubRef.current = canvasInst(type, {
            color,
            size,
        });

        return () => {
            const { current: canvasSub } = canvasSubRef;
            if (canvasSub) {
                console.log('%cunsubscribe', 'color: pink');
                canvasSub.unsubscribe();
            }
        };
    }, [type, color, size]);

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
