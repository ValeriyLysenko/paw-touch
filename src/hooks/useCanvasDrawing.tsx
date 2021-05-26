import { useEffect, useRef } from 'react';
import {
    createDrawTool,
} from 'libs/canvasLib';
import {
    resizeCanvasToDisplaySize,
} from 'libs/lib';
import useDrawingTools from './useDrawingTools';
import useResizeCanvas from './useResizeCanvas';

interface Args {
    type: string;
    color: string;
    size: number;
}

const useCanvasDrawing = (
    spec: Args,
) : Array<React.MutableRefObject<HTMLCanvasElement | null>> => {
    console.log('%cuseCanvasDrawing', 'color: tomato');
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasInstRef = useRef<CanvasInstanceCreator | null>(null);

    useEffect(() => {
        console.log('%cuseCanvasDrawing useEffect', 'color: tomato');
        const { current: canvasEl } = canvasRef;
        if (!canvasEl) return;

        // Accord drawingBuffer / display pixels
        resizeCanvasToDisplaySize(canvasEl);

        console.log('%cBefore createDrawTool', 'color: tomato');
        const { downStream$, upStream$, sub } = createDrawTool(canvasEl) as DrawToolObject;
        canvasInstRef.current = sub;

        /**
         * Add / remove crosshair cursor
         */

        const downStream$Sub = downStream$.subscribe((e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const target = e.target as HTMLCanvasElement;
            if (!target) return;
            target.style.cursor = 'crosshair';
        });

        const upStream$Sub = upStream$.subscribe((e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const target = e.target as HTMLCanvasElement;
            if (!target) return;
            target.style.cursor = 'default';
        });

        return (() => {
            downStream$Sub.unsubscribe();
            upStream$Sub.unsubscribe();
        });
    }, []);

    // useResizeCanvas(canvasRef);
    useDrawingTools(canvasRef, canvasInstRef, spec);

    return [canvasRef];
};

export default useCanvasDrawing;
