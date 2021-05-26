import { useEffect, useRef, MutableRefObject } from 'react';
import { Subscription } from 'rxjs';

const useDrawingTools = (
    canvasRef: MutableRefObject<HTMLCanvasElement | null>,
    canvasInstRef: MutableRefObject<CanvasInstanceCreator | null>,
    spec: {
        type: string;
        color: string;
        size: number;
    },
): void => {
    console.log('%cuseDrawingTools', 'color: teal');
    const { type, color, size } = spec;
    const canvasSubRef = useRef<Subscription | null>(null);

    useEffect(() => {
        console.log('%cuseDrawingTools useEffect', 'color: teal', type);
        const { current: canvasEl } = canvasRef;
        const { current: canvasInst } = canvasInstRef;

        if (!canvasEl) return;
        if (!canvasInst) return;

        canvasSubRef.current = canvasInst(type, {
            color,
            size,
        });

        return () => {
            const { current: canvasSub } = canvasSubRef;
            if (canvasSub) {
                canvasSub.unsubscribe();
            }
        };
    // ?Everything is ok here
    // ?We don't need to add 'canvasInstRef' and 'canvasRef' to array
    }, [type, color, size]);
};

export default useDrawingTools;
