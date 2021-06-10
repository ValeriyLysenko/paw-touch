import {
    useEffect, useRef, useContext,
} from 'react';
import LayoutContext from 'aux/LayoutContext';
import {
    createDrawTool,
    cursorManager,

    setCanvasBg,
} from 'libs/canvasLib';
import {
    resizeCanvasToDisplaySize,
} from 'libs/lib';

import useDrawingTools from './useDrawingTools';
// import useResizeCanvas from './useResizeCanvas';

const useCanvasDrawing = (
    activeTool: ActiveTool,
    scale: ScaleToolObject,
    auxData: AuxProps,
    history: HistoryData,
): void => {
    console.log('%cuseCanvasDrawing', 'color: tomato');
    const { type } = activeTool;
    const { ctrlKey } = auxData;
    const { canvasRef } = useContext(LayoutContext);
    const canvasDrawingRef = useRef<DrawToolObject | null>(null);

    useEffect(() => {
        console.log('%cuseCanvasDrawing useEffect#1', 'color: tomato');
        const { current: canvasEl } = canvasRef;
        if (!canvasEl) return;

        // Accord drawingBuffer / display pixels
        resizeCanvasToDisplaySize(canvasEl);
        const ctx = canvasEl.getContext('2d');
        if (!ctx) return;
        // Set default background color
        setCanvasBg(ctx);

        console.log('%cBefore createDrawTool', 'color: tomato');
        canvasDrawingRef.current = createDrawTool(canvasEl) as DrawToolObject;
    // ?Everything is ok here
    // ?We don't need to add 'canvasRef' to array
    }, []);

    useEffect(() => {
        console.log('%cuseCanvasDrawing useEffect#2', 'color: tomato');
        const { current: canvasEl } = canvasRef;
        if (!canvasEl) return;

        // Сhange the cursor depending on the tool
        cursorManager(type, canvasEl, ctrlKey);
    // ?Everything is ok here
    // ?We don't need to add 'canvasRef' to array
    }, [type, ctrlKey]);

    // useResizeCanvas();
    useDrawingTools(canvasDrawingRef, activeTool, scale, history);
};

export default useCanvasDrawing;
