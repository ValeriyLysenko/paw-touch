import {
    useEffect, useRef, MutableRefObject, useContext,
} from 'react';
import { useLocation } from 'react-router-dom';
import { Subscription } from 'rxjs';
import LayoutContext from 'aux/LayoutContext';
import { scaleCanvasWithRedrawChangeSize } from 'libs/canvasLib';

const useDrawingTools = (
    canvasDrawingRef: MutableRefObject<DrawToolObject | null>,
    ActiveTool: ActiveTool,
    scale: ScaleToolObject,
    history: HistoryData,
): void => {
    console.log('%cuseDrawingTools', 'color: teal');
    const {
        type, spec: {
            color,
            size,
        },
    } = ActiveTool;
    const { canvasRef } = useContext(LayoutContext);
    const canvasSubRef = useRef<Subscription | null>(null);
    const locationRef = useRef<{pathname: string}>({ pathname: '' });
    const location = useLocation();
    const { pathname } = location;

    console.log('location', location);
    console.log('locationRef', locationRef);

    useEffect(() => {
        console.log('%cuseDrawingTools useEffect', 'color: teal', type);
        const { current: canvasDrawing } = canvasDrawingRef;

        if (!canvasDrawing) return;

        console.log('%cBefore drawingSub', 'color: teal');
        canvasSubRef.current = canvasDrawing.drawingSub(type, {
            color,
            size,
        }, scale, history);

        // Redraw canvas if we change url (for example, we go to the gallery
        // and come back)
        if (pathname !== locationRef.current.pathname) {
            console.log('REDRAW!!!');
            const { current: canvasEl } = canvasRef;
            if (!canvasEl) return;
            const ctx = canvasEl.getContext('2d');
            if (!ctx) return;
            scaleCanvasWithRedrawChangeSize(ctx, scale.currentScale, history);
            locationRef.current.pathname = pathname;
        }

        return () => {
            const { current: canvasSub } = canvasSubRef;
            if (canvasSub) {
                canvasSub.unsubscribe();
            }
        };
    // ?Everything is ok here
    // ?We don't need to add 'canvasDrawingRef' to array
    }, [type, color, size, scale, history, pathname]);
};

export default useDrawingTools;
