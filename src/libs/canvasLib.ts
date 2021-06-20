import {
    fromEvent, Subscription,
} from 'rxjs';
import {
    map, switchMap, takeUntil, tap, filter,
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
                // Let click for left mouse button only
                filter((ev) => ev.button === 0),
                switchMap((ev) => {
                    // Handle mousedown
                    init(type, spec, scale, history, createRawDrawObject(ev), historySpan);
                    // Switch streams
                    if (type === 'zoom') {
                        return clickStream$
                            .pipe(
                                map((e) => createRawDrawObject(e)),
                            );
                    }
                    return moveStream$
                        .pipe(
                            takeUntil(upStream$.pipe(
                                tap((e) => {
                                    // Clear temp history
                                    historySpan = updateHistory(history, historySpan);
                                }),
                            )),
                            map((e) => createRawDrawObject(e)),
                        );
                }),
            )
            .subscribe({
                next(drawObj) {
                    init(type, spec, scale, history, drawObj, historySpan);
                },
                error(err) {
                    console.log('%cERROR', 'color: red', err);
                },
            }),
    };

}

/**
 * Start drawing.
 */
export function init(
    type: string,
    spec: ActiveToolSpec,
    scale: ScaleToolObject,
    history: HistoryData,
    drawObj: RawDrawingSpec,
    historySpan: HistoryObj[],
) {
    console.log('HERE');
    const { currentScale, scaledPosRatio } = scale;
    let newDrawObj = drawObj;

    // !Use this correction with 'scaleCanvasWithRedrawChangeSize' only
    if (currentScale !== 1) {
        const { x, y } = drawObj;
        newDrawObj = {
            ...drawObj,
            x: x * scaledPosRatio[0],
            y: y * scaledPosRatio[1],
        };

        console.log('translation', scaledPosRatio);
    }

    // drawStrategy(type, drawObj, {
    drawStrategy(type, newDrawObj, {
        spec, scale, historySpan, history,
    });
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
        initScale, scaleStep, scaleHistory,
    } = scale;

    const ctrlKey = spec?.ctrlKey ?? false;
    const scaleHistoryCopy = [...scaleHistory];
    const scaleType = !ctrlKey ? '+' : '-';

    // Add current click to history
    scaleHistoryCopy.push({
        type: scaleType,
    });

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
    // scaleCanvasWithRedraw(ctx, zoom, history);
    scaleCanvasWithRedrawChangeSize(ctx, zoom, history);

    const { canvas } = ctx;
    let scaledPosRatio: number[] = [];
    if (zoom !== 1) {
        scaledPosRatio = [
            canvas.width / parseInt(canvas.style.width, 10),
            canvas.height / parseInt(canvas.style.height, 10),
        ];
    }

    // Set current zoom to store
    mainCanvas.setScaleZoom(
        { type: scaleType },
        zoom,
        scaledPosRatio,
    );

    console.log('After setScaleZoom');
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
    // scaleCanvasWithRedraw(ctx, zoom, history);
    scaleCanvasWithRedrawChangeSize(ctx, zoom, history);

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
        [name:string]: TypeToToolMapMappedFunc;
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
 * Basic redraw canvas functionality taking into account history position.
 */
export function redrawCanvasWithHistory(
    ctx: CanvasRenderingContext2D,
    history: HistoryData,
): void {
    const typeToToolMap: {
        [name:string]: TypeToToolMapMappedFunc;
    } = {
        pencil: pencilDraw,
        brush: brushDraw,
        eraser,
    };

    const {
        data, spec: {
            position,
        },
    } = history;
    const dataLen = data.length;
    const modData = [...data];
    modData.splice((dataLen - position), position);

    modData.forEach((arr) => {
        arr.forEach((item) => {
            const args = item.spec as DrawingSpec;
            typeToToolMap[item.type](ctx, args);
        });
    });

}

/**
 * Scale canvas with redraw functionality (using 'scale' method).
 */
export function scaleCanvasWithRedraw(
    ctx: CanvasRenderingContext2D,
    zoom: number,
    history: HistoryData,
): void {
    const { width, height } = ctx.canvas;
    const translation = getTranslation([width, height], zoom);

    ctx.save();
    ctx.translate(translation[0], translation[1]);
    ctx.scale(zoom, zoom);
    ctx.clearRect(0, 0, width, height);
    // Set default background color
    setCanvasBg(ctx);
    redrawCanvas(ctx, history.data);
    ctx.restore();
}

/**
 * Scale canvas with redraw functionality (changing phisical canvas size).
 */
export function scaleCanvasWithRedrawChangeSize(
    ctx: CanvasRenderingContext2D,
    zoom: number,
    history: HistoryData,
): void {
    const { canvas } = ctx;
    const { width, height } = canvas;
    const newWidth = width * zoom;
    const newHeight = height * zoom;

    // Set layout canvas size
    canvas.style.width = `${newWidth}px`;
    canvas.style.height = `${newHeight}px`;

    redrawCanvasWithHistory(ctx, history);
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
    const translation = getTranslation([width, height], zoom);

    // Create temp canvas
    const tempCanvas = createTempCanvas(
        ctx,
        canvasCache,
    );

    ctx.save();
    ctx.translate(translation[0], translation[1]);
    ctx.scale(zoom, zoom);
    ctx.clearRect(0, 0, width, height);
    // Set default background color
    setCanvasBg(ctx);
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
    canvas: HTMLCanvasElement,
    ctrlKey: boolean,
): void {
    switch (type) {
        case 'pencil':
        case 'brush':
        case 'eraser': {
            canvas.style.cursor = 'crosshair'; // eslint-disable-line
            break;
        }
        case 'zoom':
            canvas.style.cursor = !ctrlKey ? 'zoom-in' : 'zoom-out'; // eslint-disable-line
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

    // const modHistory = [...history];
    // modHistory.splice((historyLen - newHistoryPosition), newHistoryPosition);

    const { width, height } = ctx.canvas;

    ctx.save();
    ctx.clearRect(0, 0, width, height);
    // Set default background color
    setCanvasBg(ctx);
    // redrawCanvas(ctx, modHistory);
    redrawCanvasWithHistory(ctx, {
        data: history,
        spec: {
            position: newHistoryPosition,
        },
    });
    ctx.restore();

    mainCanvas.setHistorySpecPos(newHistoryPosition);
}

/**
 * Get transition according to zoom.
 */
export function getTranslation(
    size: number[],
    zoom: number,
): number[] {
    const newWidth = size[0] * zoom;
    const newHeight = size[1] * zoom;
    return [-((newWidth - size[0]) / 2), -((newHeight - size[1]) / 2)];
}

/**
 * Update history on 'mouseup' event.
 */
export function updateHistory(
    history: HistoryData,
    historySpan: HistoryObj[],
): [] {
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

    return [];
}

/**
 * Just set canvas background.
 */
export function setCanvasBg(
    ctx: CanvasRenderingContext2D,
): void {
    const { canvas } = ctx;
    ctx.fillStyle = '#fff'; /* eslint-disable-line */
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
