import { fromEvent, Subscription } from 'rxjs';
import {
    map, switchMap, takeUntil,
} from 'rxjs/operators';
import { mainCanvas } from 'aux/init';

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

    return {
        downStream$,
        upStream$,
        moveStream$,
        clickStream$,
        drawingSub: (
            type: string,
            spec: ActiveToolSpec,
            scale: ScaleToolObject,
        ): Subscription => downStream$
            .pipe(
                switchMap((_) => {
                    switch (type) {
                        case 'zoom': {
                            return clickStream$
                                .pipe(
                                    map((e) => {
                                        const target = e.target as HTMLCanvasElement;
                                        return {
                                            x: e.offsetX,
                                            y: e.offsetY,
                                            ctx: target && target.getContext('2d'),
                                            ctrlKey: e.ctrlKey,
                                        };
                                    }),
                                );
                        }
                        default: {
                            return moveStream$.pipe(
                                takeUntil(upStream$),
                                map((e) => {
                                    const target = e.target as HTMLCanvasElement;
                                    return {
                                        x: e.offsetX,
                                        y: e.offsetY,
                                        ctx: target && target.getContext('2d'),
                                    };
                                }),
                            );
                        }

                    }
                }),
            )
            .subscribe({
                next(drawObj) {
                    drawStrategy(type, drawObj, spec, scale);
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
    drawObj: {
        x: number,
        y: number,
        ctx: CanvasRenderingContext2D | null,
        ctrlKey?: boolean,
    },
    spec: ActiveToolSpec,
    scale: ScaleToolObject,
): void {
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
                color, x, y, width: size, height: size,
            });
            break;
        }
        case 'brush': {
            brushDraw(ctx, {
                color, x, y, radius: size,
            });
            break;
        }
        case 'eraser':
            eraser(ctx, {
                x, y, radius: size,
            });
            break;
        case 'zoom':
            zoomer(ctx, scale, { ctrlKey });
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
    spec: {
        color: string,
        x: number,
        y: number,
        width: number,
        height: number,
    },
): void {
    // Set default 'globalCompositeOperation' mode (may be modified after, for example, erasing)
    ctx.globalCompositeOperation = 'source-over'; // eslint-disable-line
    ctx.fillStyle = spec.color; // eslint-disable-line
    ctx.fillRect(spec.x, spec.y, spec.width, spec.height);
}

/**
 * Brush drawing functionality.
 */
export function brushDraw(
    ctx: CanvasRenderingContext2D,
    spec: {
        color: string,
        x: number,
        y: number,
        radius: number,
    },
): void {
    const {
        color, x, y, radius,
    } = spec;
    // Set default 'globalCompositeOperation' mode (may be modified after, for example, erasing)
    ctx.globalCompositeOperation = 'source-over'; // eslint-disable-line
    ctx.fillStyle = color; // eslint-disable-line
    ctx.beginPath();
    ctx.arc(x - (radius / 2), y - (radius / 2), radius, 0, 2 * Math.PI, false);
    ctx.fill();
}

/**
 * Eraser functionality.
 */
export function eraser(
    ctx: CanvasRenderingContext2D,
    spec: {
        x: number,
        y: number,
        radius: number,
    },
): void {
    const { x, y, radius } = spec;
    ctx.fillStyle = '#fff'; // eslint-disable-line
    // Set proper 'globalCompositeOperation' mode.
    // The existing canvas content is kept where both the new shape and existing canvas content overlap.
    // Everything else is made transparent.
    ctx.globalCompositeOperation = 'destination-out'; // eslint-disable-line
    ctx.beginPath();
    ctx.arc(x - (radius / 2), y - (radius / 2), radius, 0, 2 * Math.PI, false);
    ctx.fill();
}

/**
 * Zoom functionality.
 */
export function zoomer(
    ctx: CanvasRenderingContext2D,
    spec: ScaleToolObject,
    aux: {
        ctrlKey: boolean | undefined,
    },
): void {
    // Set default 'globalCompositeOperation' mode (may be modified after, for example, erasing)
    ctx.globalCompositeOperation = 'source-over'; // eslint-disable-line
    const {
        initScale, scaleStep, scaleHistory, canvasCache,
    } = spec;

    if (!canvasCache) return;

    const { ctrlKey } = aux;
    const scaleType = !ctrlKey ? '+' : '-';
    // Add current click to history
    scaleHistory.push({
        type: scaleType,
    });

    // Get current zoom
    const zoom = zoomManager({
        initScale,
        scaleStep,
        scaleHistory,
    });

    // Set current zoom to store
    mainCanvas.setActiveToolZoom(
        { type: scaleType },
        zoom,
    );

    // Create temp canvas
    const tempCanvas = createTempCanvas(
        ctx,
        canvasCache,
    );

    // Scale current canvas
    scaleCanvas(
        ctx,
        tempCanvas,
        zoom,
    );
}

/**
 * Scale canvas.
 */
export function scaleCanvas(
    ctx: CanvasRenderingContext2D,
    tempCanvas: HTMLCanvasElement,
    zoom: number,
): void {
    const { width, height } = ctx.canvas;

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
): void {
    switch (type) {
        case 'pencil':
        case 'brush':
        case 'eraser': {
            el.style.cursor = 'crosshair'; // eslint-disable-line
            break;
        }
        case 'zoom':
            el.style.cursor = 'zoom-in'; // eslint-disable-line
            break;
        default: {
            break;
        }
    }
}
