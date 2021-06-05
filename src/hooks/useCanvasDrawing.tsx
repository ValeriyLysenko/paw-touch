import { useEffect, useRef, MutableRefObject } from 'react';
import {
    createDrawTool,
    cursorManager,
} from 'libs/canvasLib';
import {
    resizeCanvasToDisplaySize,
} from 'libs/lib';
import useDrawingTools from './useDrawingTools';
// import useResizeCanvas from './useResizeCanvas';

const useCanvasDrawing = (
    activeTool: ActiveTool,
    auxData: AuxProps,
    history: HistoryData,
) : Array<MutableRefObject<HTMLCanvasElement | null>> => {
    console.log('%cuseCanvasDrawing', 'color: tomato');
    const { type } = activeTool;
    const { ctrlKey } = auxData;
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

        // Сhange the cursor depending on the tool
        cursorManager(type, canvasEl, ctrlKey);
    }, [type, ctrlKey]);

    // useResizeCanvas(canvasRef);
    useDrawingTools(canvasRef, canvasDrawingRef, activeTool, history);

    return [canvasRef];
};

export default useCanvasDrawing;
