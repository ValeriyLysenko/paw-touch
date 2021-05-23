import {
    FC, useCallback, useEffect, useRef, useState,
} from 'react';
import { observer } from 'mobx-react';
import { Subscription } from 'rxjs';
import CanvasStore from 'stores/CanvasStore';
import { createDrawTool } from 'libs/canvasLib';
import {
    getMaxWindowSize,
    resizeCanvasToDisplaySize,
    resizeCanvasToDisplaySizeConstCanvas,
} from 'libs/lib';
import StepControls from 'components/LayoutControls/StepControls';
import ToolSettings from 'components/Tools/ToolSettings';

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
                const maxWindowSize = getMaxWindowSize();
                // const sizeRatio: number[] = [0.943425076, 0.82658518];
                // const sizeRatio: number[] = [0.937157107, 0.82658518];
                // const canvasRectSize = canvasEl.getBoundingClientRect();
                // console.log('screen.availWidth', window.screen.availWidth);
                // console.log('window.outerWidth', window.outerWidth);
                // console.log('window.innerWidth', window.innerWidth);
                // console.log('res', window.outerWidth - window.innerWidth);

                // console.log('maxWindowSize', maxWindowSize);
                // console.log('body inners', document.body.clientWidth, document.body.clientHeight);
                // console.log('canvasRectSize', canvasRectSize);
                // console.log('sizeRatio', sizeRatio);

                // Accord drawingBuffer / display pixels
                resizeCanvasToDisplaySize(canvasEl);

                // resizeCanvasToDisplaySizeConstCanvas(canvasEl, sizeRatio);

                // canvasEl.width = 1866;
                // canvasEl.height = 1097;
                // canvasEl.setAttribute('style', 'width: 1866px; height: 1097px');

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
