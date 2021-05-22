import {
    FC, useCallback, useEffect, useRef,
} from 'react';
import { observer } from 'mobx-react';
import { Subscription } from 'rxjs';
import CanvasStore from 'stores/CanvasStore';
import { createDrawTool } from 'libs/canvasLib';
import {
    resizeCanvasToDisplaySize,
} from 'libs/lib';

interface Props {
    mainCanvas: CanvasStore;
}

const BasicLayout: FC<Props> = observer(({ mainCanvas }) => {
    // console.log('%cBasicLayout', 'color: green;', mainCanvas);
    const canvasSize = mainCanvas.getMainCanvasSize;
    const { type, spec } = mainCanvas.getActiveTool;
    const { size } = spec;
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasInstRef = useRef<CanvasInstanceCreator | null>(null);
    const canvasSubRef = useRef<Subscription | null>(null);
    const manageCanvasSise = useCallback((command?: string): void => {
        const { current: canvasEl } = canvasRef;

        if (!canvasEl) return;

        switch (command) {
            case 'createDrawTool': {
                console.log('%cBefore createDrawTool', 'color: blue');
                canvasInstRef.current = createDrawTool(canvasEl);
                break;
            }
            case 'setCanvasSize': {
                const ctx = canvasEl.getContext('2d');

                if (!ctx) break;
                // Backup canvas
                const canvasBackup = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);

                // Accord drawingBuffer / display pixels
                resizeCanvasToDisplaySize(canvasEl);

                // !TODO Adequate canvas resize implementation
                // const ratio = Math.min(
                //     canvasEl.width / wrapperEl.clientWidth,
                //     canvasEl.height / wrapperEl.clientHeight,
                // );
                // ctx.scale(ratio, ratio);

                // Restore canvas
                ctx.putImageData(canvasBackup, 0, 0);

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
        console.log('%cuseEffect#3', 'color: green');
        const { current: canvasEl } = canvasRef;
        const { current: canvasInst } = canvasInstRef;

        if (!canvasEl) return;
        if (!canvasInst) return;
        console.log('%cBefore get subscription', 'color: green');

        canvasSubRef.current = canvasInst({
            size,
        });

        return () => {
            const { current: canvasSub } = canvasSubRef;
            if (canvasSub) {
                console.log('%cunsubscribe', 'color: pink');
                canvasSub.unsubscribe();
            }
        };
    }, [size]);

    return (
        <div id="pt-canvas-container" className="pt-canvas-container">
            <canvas ref={canvasRef} />
        </div>
    );

});

export default BasicLayout;
