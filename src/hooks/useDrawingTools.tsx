import {
    useEffect, useRef, MutableRefObject,
} from 'react';
import { Subscription } from 'rxjs';

const useDrawingTools = (
    canvasDrawingRef: MutableRefObject<DrawToolObject | null>,
    ActiveTool: ActiveTool,
    history: HistoryData,
): void => {
    console.log('%cuseDrawingTools', 'color: teal');
    const {
        type, spec: {
            color,
            size,
        },
        scale,
    } = ActiveTool;
    const canvasSubRef = useRef<Subscription | null>(null);

    useEffect(() => {
        console.log('%cuseDrawingTools useEffect', 'color: teal', type);
        const { current: canvasDrawing } = canvasDrawingRef;

        if (!canvasDrawing) return;

        console.log('%cBefore drawingSub', 'color: teal');
        canvasSubRef.current = canvasDrawing.drawingSub(type, {
            color,
            size,
        }, scale, history);

        return () => {
            const { current: canvasSub } = canvasSubRef;
            if (canvasSub) {
                canvasSub.unsubscribe();
            }
        };
    // ?Everything is ok here
    // ?We don't need to add 'canvasDrawingRef' to array
    }, [type, color, size, scale, history]);
};

export default useDrawingTools;
