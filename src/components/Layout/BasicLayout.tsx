import {
    FC, useEffect, useRef,
} from 'react';
import { observer } from 'mobx-react';
import CanvasStore from 'stores/CanvasStore';
import { createPencil } from 'libs/canvasLib';

interface Props {
    mainCanvas: CanvasStore;
}

const BasicLayout: FC<Props> = observer(({ mainCanvas }) => {
    // console.log('%cBasicLayout', 'color: green;', mainCanvas);
    const windowSize = mainCanvas.getWindowSize;
    const canvasRef = useRef(null);

    useEffect(() => {
        console.log('%cuseEffect', 'color: green');
        const el = document.getElementById('pt-canvas-container') as HTMLDivElement;
        const canvasEl = canvasRef.current as (HTMLCanvasElement | null);

        if (!canvasEl) return;

        const sub = createPencil(canvasEl);

        // Set canvas size
        canvasEl.width = el.clientWidth;
        canvasEl.height = el.clientHeight;

        return () => {
            if (canvasEl) {
                sub.unsubscribe();
            }
        };
    }, []);

    return (
        <div id="pt-canvas-container" className="pt-canvas-container">
            <canvas ref={canvasRef} width={windowSize[0]} height={windowSize[1]} />
        </div>
    );

});

export default BasicLayout;
