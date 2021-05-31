import { useEffect, useRef } from 'react';
import {
    createDrawTool,
    cursorManager,
} from 'libs/canvasLib';
import {
    resizeCanvasToDisplaySize,
} from 'libs/lib';
import useDrawingTools from './useDrawingTools';
import useResizeCanvas from './useResizeCanvas';

interface Args extends ActiveTool {}

const useCanvasDrawing = (
    spec: Args,
) : Array<React.MutableRefObject<HTMLCanvasElement | null>> => {
    console.log('%cuseCanvasDrawing', 'color: tomato');
    const { type } = spec;
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const canvasDrawingRef = useRef<DrawToolObject | null>(null);

    useEffect(() => {
        console.log('%cuseCanvasDrawing useEffect#1', 'color: tomato');
        const { current: canvasEl } = canvasRef;
        if (!canvasEl) return;

        // Accord drawingBuffer / display pixels
        resizeCanvasToDisplaySize(canvasEl);

        console.log('%cBefore createDrawTool', 'color: tomato');
        canvasDrawingRef.current = createDrawTool(canvasEl) as DrawToolObject;
    }, []);

    useEffect(() => {
        console.log('%cuseCanvasDrawing useEffect#2', 'color: tomato');
        const { current: canvasEl } = canvasRef;
        if (!canvasEl) return;

        // Add / remove crosshair cursor
        cursorManager(type, canvasEl);
    }, [type]);

    // useResizeCanvas(canvasRef);
    useDrawingTools(canvasRef, canvasDrawingRef, spec);

    return [canvasRef];
};

export default useCanvasDrawing;
