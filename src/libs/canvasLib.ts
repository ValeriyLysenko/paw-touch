import { fromEvent } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

export function pencilDraw(
    ctx: CanvasRenderingContext2D,
    spec: {
        x: number,
        y: number,
        width: number,
        height: number,
    },
) {
    ctx?.fillRect(spec.x, spec.y, spec.width, spec.height);
}

export function createDrawTool(
    canvasEl: HTMLCanvasElement,
) {
    const downStream$ = fromEvent<MouseEvent>(canvasEl, 'mousedown');
    const upStream$ = fromEvent<MouseEvent>(canvasEl, 'mouseup');
    const moveStream$ = fromEvent<MouseEvent>(canvasEl, 'mousemove');

    return (spec: ActiveToolSpec) => {
        const { size } = spec;

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
                // console.log('%cdrawObj', 'color: olive', drawObj);
                    const { x, y, ctx } = drawObj;
                    if (!ctx) return;
                    pencilDraw(ctx, {
                        x, y, width: size, height: size,
                    });
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

export function brushDraw() {}
