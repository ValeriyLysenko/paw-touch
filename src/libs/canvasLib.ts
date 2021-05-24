import { fromEvent } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

/**
 * Create basic drawing tool.
 */
export function createDrawTool(
    canvasEl: HTMLCanvasElement,
) {
    const downStream$ = fromEvent<MouseEvent>(canvasEl, 'mousedown');
    const upStream$ = fromEvent<MouseEvent>(canvasEl, 'mouseup');
    const moveStream$ = fromEvent<MouseEvent>(canvasEl, 'mousemove');

    return (
        type: string,
        spec: ActiveToolSpec,
    ) => {
        const { color, size } = spec;

        return downStream$
            .pipe(
                switchMap((_) => moveStream$.pipe(
                    takeUntil(upStream$),
                    map((e) => {
                        const target = e.target as HTMLCanvasElement;
                        // console.log(e);
                        // throw Error('Big fucking error!!!');
                        return {
                            x: e.offsetX,
                            y: e.offsetY,
                            ctx: target && target.getContext('2d'),
                        };
                    }),
                )),
            )
            .subscribe({
                next(drawObj) {
                    const {
                        x, y, ctx,
                    } = drawObj;
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
                        default: {
                            break;
                        }
                    }
                },
                error(err) {
                    console.log('%cERROR', 'color: red', err);
                },
                complete() {
                    console.log('%cDONE', 'color: azure');
                },
            });
    };
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
    if (!ctx) return;
    // Set default 'globalCompositeOperation' mode (reset after erasing)
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
    if (!ctx) return;
    const {
        color, x, y, radius,
    } = spec;
    // Set default 'globalCompositeOperation' mode (reset after erasing)
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
    if (!ctx) return;
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
