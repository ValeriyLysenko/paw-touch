import { fromEvent, Subscription } from 'rxjs';
import {
    map, switchMap, takeUntil, tap,
} from 'rxjs/operators';
import { mainCanvas } from 'aux/init';

/**
 * Create data object for drawing / zooming tools.
 */
export function createRawDrawObject(e: MouseEvent): RawDrawingSpec {
    const target = e.target as HTMLCanvasElement;
    return {
        x: e.offsetX,
        y: e.offsetY,
        ctx: target && target.getContext('2d'),
        ctrlKey: e.ctrlKey,
    };
}

/**
 * Create basic drawing tool.
 */
export function createDrawTool(
    canvasEl: HTMLCanvasElement,
): DrawToolObject {
    const downStream$ = fromEvent<MouseEvent>(canvasEl, 'mousedown');
    const upStream$ = fromEvent<MouseEvent>(canvasEl, 'mouseup');
    const moveStream$ = fromEvent<MouseEvent>(canvasEl, 'mousemove');
    const clickStream$ = fromEvent<MouseEvent>(canvasEl, 'click');
    // Temp history (between mouse clicks)
    let historySpan: HistoryObj[] = [];

    return {
        downStream$,
        upStream$,
        moveStream$,
        clickStream$,
        drawingSub: (
            type: string,
            spec: ActiveToolSpec,
            scale: ScaleToolObject,
            history: HistoryData,
        ): Subscription => downStream$
            .pipe(
                switchMap((_) => {
                    switch (type) {
                        case 'zoom': {
                            return clickStream$
                                .pipe(
                                    map((e) => createRawDrawObject(e)),
                                );
                        }
                        default: {
                            return moveStream$
                                .pipe(
                                    takeUntil(upStream$.pipe(
                                        tap((e) => {
                                            console.log('MOUSEUP', e);
                                            const {
                                                data, spec: {
                                                    position,
                                                },
                                            } = history;
                                            if (position) {
                                                const newHistory = [...data];
                                                newHistory.splice(newHistory.length - position, position);
                                                newHistory.push(historySpan);
                                                mainCanvas.setHistory(newHistory);
                                                mainCanvas.setHistorySpecPos(0);
                                            } else mainCanvas.setHistoryItem(historySpan);
                                            // Clear temp history
                                            historySpan = [];
                                        }),
                                    )),
                                    map((e) => createRawDrawObject(e)),
                                );
                        }

                    }
                }),
            )
            .subscribe({
                next(drawObj) {
                    console.log('HERE');
                    drawStrategy(type, drawObj, {
                        spec, scale, historySpan, history,
                    });
                },
                error(err) {
                    console.log('%cERROR', 'color: red', err);
                },
            }),
    };

}

/**
 * Define draw strategy.
 */
export function drawStrategy(
    type: string,
    drawObj: RawDrawingSpec,
    aux: {
        spec: ActiveToolSpec,
        scale: ScaleToolObject,
        historySpan: HistoryObj[],
        history: HistoryData,
    },
): void {
    const {
        spec,
        scale,
        historySpan,
        history,
    } = aux;
    const {
        x, y, ctx, ctrlKey,
    } = drawObj;
    const {
        color, size,
    } = spec;
    if (!ctx) return;

    switch (type) {
        case 'pencil': {
            pencilDraw(ctx, {
                color, x, y, size,
            });
            historySpan.push({
                type,
                spec: {
                    color, x, y, size,
                },
            });
            break;
        }
        case 'brush': {
            brushDraw(ctx, {
                color, x, y, size,
            });
            historySpan.push({
                type,
                spec: {
                    color, x, y, size,
                },
            });
            break;
        }
        case 'eraser':
            eraser(ctx, {
                x, y, size,
            });
            historySpan.push({
                type,
                spec: {
                    x, y, size,
                },
            });
            break;
        case 'zoom':
            zoomer(ctx, scale, history, { ctrlKey });
            break;
        default: {
            break;
        }
    }
    // Record drawing
    // recordHistory(type, {
    //     x, y, color, size,
    // });
}

/**
 * Pencil drawing functionality.
 */
export function pencilDraw(
    ctx: CanvasRenderingContext2D,
    spec: DrawingSpec,
): void {
    ctx.globalCompositeOperation = 'source-over'; // eslint-disable-line
    ctx.fillStyle = spec.color; // eslint-disable-line
    ctx.fillRect(spec.x, spec.y, spec.size, spec.size);
}

/**
 * Brush drawing functionality.
 */
export function brushDraw(
    ctx: CanvasRenderingContext2D,
    spec: DrawingSpec,
): void {
    const {
        color, x, y, size,
    } = spec;
    ctx.globalCompositeOperation = 'source-over'; // eslint-disable-line
    ctx.fillStyle = color; // eslint-disable-line
    ctx.beginPath();
    ctx.arc(x - (size / 2), y - (size / 2), size, 0, 2 * Math.PI, false);
    ctx.fill();
}

/**
 * Eraser functionality.
 */
export function eraser(
    ctx: CanvasRenderingContext2D,
    spec: Omit<DrawingSpec, 'color'>,
): void {
    const { x, y, size } = spec;
    ctx.fillStyle = '#fff'; // eslint-disable-line
    // Set proper 'globalCompositeOperation' mode.
    // The existing canvas content is kept where both the new shape and existing canvas content overlap.
    // Everything else is made transparent.
    ctx.globalCompositeOperation = 'destination-out'; // eslint-disable-line
    ctx.beginPath();
    ctx.arc(x - (size / 2), y - (size / 2), size, 0, 2 * Math.PI, false);
    ctx.fill();
}

/**
 * Zoom functionality.
 */
export function zoomer(
    ctx: CanvasRenderingContext2D,
    scale: ScaleToolObject,
    history: HistoryData,
    spec?: {
        ctrlKey?: boolean | undefined,
    },
): void {
    ctx.globalCompositeOperation = 'source-over'; // eslint-disable-line
    const {
        initScale, scaleStep, scaleHistory, canvasCache,
    } = scale;

    if (!canvasCache) return;

    const ctrlKey = spec?.ctrlKey ?? false;
    const scaleHistoryCopy = [...scaleHistory];
    const scaleType = !ctrlKey ? '+' : '-';

    // Add current click to history
    scaleHistoryCopy.push({
        type: scaleType,
    });

    console.log('~~~~~~~~~~~~~~');
    console.log(scaleHistoryCopy);
    console.log(scale.currentScale);

    // Get current zoom
    const zoom = zoomManager({
        initScale,
        scaleStep,
        scaleHistory: scaleHistoryCopy,
    });

    // Scale current canvas
    // scaleCanvas(
    //     ctx,
    //     canvasCache,
    //     zoom,
    // );

    // Scale / redraw canvas
    scaleCanvasWithRedraw(ctx, zoom, history);

    // Set current zoom to store
    mainCanvas.setActiveToolZoom(
        { type: scaleType },
        zoom,
    );

    console.log('After setActiveToolZoom');
}

/**
 * Simplified zoom functionality (during reset).
 */
export function zoomOnReset(
    ctx: CanvasRenderingContext2D,
    history: HistoryData,
): void {
    ctx.globalCompositeOperation = 'source-over'; // eslint-disable-line
    const zoom = 1;
    // Scale / redraw canvas
    scaleCanvasWithRedraw(ctx, zoom, history);

    console.log('After zoomOnReset');
}

/**
 * Basic redraw canvas functionality.
 */
export function redrawCanvas(
    ctx: CanvasRenderingContext2D,
    data: HistoryObj[][],
): void {
    const typeToToolMap: {
        [name:string]: TypeToToolMapMappedFunc
    } = {
        pencil: pencilDraw,
        brush: brushDraw,
        eraser,
    };
    data.forEach((arr) => {
        arr.forEach((item) => {
            const args = item.spec as DrawingSpec;
            typeToToolMap[item.type](ctx, args);
        });
    });

}

/**
 * Scale canvas with redraw functionality.
 */
export function scaleCanvasWithRedraw(
    ctx: CanvasRenderingContext2D,
    zoom: number,
    history: HistoryData,
): void {
    const { width, height } = ctx.canvas;

    const newWidth = width * zoom;
    const newHeight = height * zoom;
    const translation = [-((newWidth - width) / 2), -((newHeight - height) / 2)];

    ctx.save();
    ctx.translate(translation[0], translation[1]);
    ctx.scale(zoom, zoom);
    ctx.clearRect(0, 0, width, height);
    redrawCanvas(ctx, history.data);
    ctx.restore();
}

/**
 * Scale canvas.
 */
export function scaleCanvas(
    ctx: CanvasRenderingContext2D,
    canvasCache: ImageData,
    zoom: number,
): void {
    const { width, height } = ctx.canvas;

    // Create temp canvas
    const tempCanvas = createTempCanvas(
        ctx,
        canvasCache,
    );

    const newWidth = width * zoom;
    const newHeight = height * zoom;
    const translation = [-((newWidth - width) / 2), -((newHeight - height) / 2)];

    ctx.save();
    ctx.translate(translation[0], translation[1]);
    ctx.scale(zoom, zoom);
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(tempCanvas, 0, 0);
    ctx.restore();
}

/**
 * Create temp canvas for zoom manipulations.
 */
export function createTempCanvas(
    ctx: CanvasRenderingContext2D,
    imageData: ImageData,
): HTMLCanvasElement {
    const { width, height } = ctx.canvas;

    // Backup canvas
    // const imageData = ctx.getImageData(0, 0, width, height);

    const tempCanvas = document.createElement('canvas');

    // Set canvas size
    tempCanvas.width = width;
    tempCanvas.height = height;
    tempCanvas.setAttribute('style', `width: ${width}px; height: ${height}px;`);

    // Put imageData (current canvas) into temporary one
    tempCanvas.getContext('2d')?.putImageData(imageData, 0, 0);

    return tempCanvas;
}

/**
 * Manage zoom size.
 */
export function zoomManager(
    spec: {
        initScale: number,
        scaleStep: number,
        scaleHistory: ScaleToolHistory[],
    },
): number {
    const {
        initScale,
        scaleStep,
        scaleHistory,
    } = spec;
    let zoomSize = 0;
    scaleHistory.forEach((item) => {
        zoomSize = item.type === '+' ? zoomSize + scaleStep : zoomSize - scaleStep;
    });
    return initScale + zoomSize;
}

/**
 * Manage CSS 'cursor'.
 */
export function cursorManager(
    type: string,
    el: HTMLCanvasElement,
    ctrlKey: boolean,
): void {
    switch (type) {
        case 'pencil':
        case 'brush':
        case 'eraser': {
            el.style.cursor = 'crosshair'; // eslint-disable-line
            break;
        }
        case 'zoom':
            el.style.cursor = !ctrlKey ? 'zoom-in' : 'zoom-out'; // eslint-disable-line
            break;
        default: {
            break;
        }
    }
}

/**
 * Let us go forward / back through history
 */
export function goThroughHistory(
    canvas: HTMLCanvasElement,
    type: string,
    spec: {
        position: number,
        history: HistoryObj[][],
    },
) {
    const ctx = canvas.getContext('2d');
    const { position, history } = spec;
    const newHistoryPosition = type === 'prev' ? position + 1 : position - 1;
    const historyLen = history.length;

    if (!ctx) return;
    if (newHistoryPosition > historyLen) return;

    const modHistory = [...history];
    modHistory.splice((historyLen - newHistoryPosition), newHistoryPosition);

    const { width, height } = ctx.canvas;

    ctx.save();
    ctx.clearRect(0, 0, width, height);
    redrawCanvas(ctx, modHistory);
    ctx.restore();

    mainCanvas.setHistorySpecPos(newHistoryPosition);
}
