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

const useCanvasDrawing = (
    activeTool: ActiveTool,
    scale: ScaleToolObject,
    auxData: AuxProps,
    history: HistoryData,
): void => {
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

        canvasDrawingRef.current = createDrawTool(canvasEl) as DrawToolObject;
    }, [canvasRef]);

    useEffect(() => {
        const { current: canvasEl } = canvasRef;
        if (!canvasEl) return;

        // Сhange the cursor depending on the tool
        cursorManager(type, canvasEl, ctrlKey);
    }, [type, ctrlKey, canvasRef]);

    useDrawingTools(canvasDrawingRef, activeTool, scale, history);
};

export default useCanvasDrawing;
