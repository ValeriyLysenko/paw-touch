import {
    FC, useEffect, useRef,
} from 'react';
import { observer } from 'mobx-react';
import { Subscription } from 'rxjs';
import CanvasStore from 'stores/CanvasStore';
import { createDrawTool } from 'libs/canvasLib';

interface Props {
    mainCanvas: CanvasStore;
}

const BasicLayout: FC<Props> = observer(({ mainCanvas }) => {
    // console.log('%cBasicLayout', 'color: green;', mainCanvas);
    const windowSize = mainCanvas.getWindowSize;
    const { type, spec } = mainCanvas.getActiveTool;
    const { size } = spec;
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasInstRef = useRef<(canvasSpec: ActiveToolSpec) => Subscription>(null);
    const canvasSubRef = useRef<Subscription>(null);

    useEffect(() => {
        console.log('%cuseEffect#1', 'color: blue');
        const el = document.getElementById('pt-canvas-container') as HTMLDivElement;
        const { current: canvasEl } = canvasRef;

        if (!canvasEl) return;

        // Set canvas size
        canvasEl.width = el.clientWidth;
        canvasEl.height = el.clientHeight;

        // console.log('%cBefore createDrawTool', 'color: blue');
        // @ts-ignore
        canvasInstRef.current = createDrawTool(canvasEl);
    }, []);

    useEffect(() => {
        console.log('%cuseEffect#2', 'color: green');
        const { current: canvasEl } = canvasRef;
        const { current: canvasInst } = canvasInstRef;

        if (!canvasEl) return;
        if (!canvasInst) return;
        console.log('%cBefore get subscription', 'color: green');

        // @ts-ignore
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
            <canvas ref={canvasRef} width={windowSize[0]} height={windowSize[1]} />
        </div>
    );

});

export default BasicLayout;
