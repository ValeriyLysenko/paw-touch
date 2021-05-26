import {
    useContext, useEffect, MutableRefObject,
} from 'react';
import AppContext from 'aux/AppContext';
import {
    resizeCanvasToDisplaySize,
} from 'libs/lib';

const useResizeCanvas = (
    canvasRef: MutableRefObject<HTMLCanvasElement | null>,
): void => {
    console.log('%cuseResizeCanvas', 'color: blue');
    const { mainCanvas } = useContext(AppContext);
    const canvasSize = mainCanvas.getMainCanvasSize;

    useEffect(() => {
        console.log('%cuseResizeCanvas useEffect', 'color: blue');
        const { current: canvasEl } = canvasRef;
        if (!canvasEl) return;

        const ctx = canvasEl.getContext('2d');
        if (!ctx) return;

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
    // ?Everything is ok here
    // ?We don't need to add 'canvasRef' to array
    }, [canvasSize]);
};

export default useResizeCanvas;
