import {
    FC, useEffect, useRef,
} from 'react';
import { fromEvent } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { observer } from 'mobx-react';
import CanvasStore from 'stores/CanvasStore';

interface Props {
    mainCanvas: CanvasStore;
}

const BasicLayout: FC<Props> = observer(({ mainCanvas }) => {
    // console.log('%cBasicLayout', 'color: green;', mainCanvas);
    const windowSize = mainCanvas.getWindowSize;
    const canvasRef = useRef(null);

    useEffect(() => {
        console.log('%cuseEffect', 'color: green');
        const el = document.getElementById('pt-canvas-container') as HTMLDivElement;
        const canvasEl = canvasRef.current as (HTMLCanvasElement | null);

        if (!canvasEl) return;

        const drawLine = (
            ctx: CanvasRenderingContext2D,
            spec: {
                x: number,
                y: number,
            },
        ) => {
            ctx?.fillRect(spec.x, spec.y, 2, 2);
        };
        const downStream$ = fromEvent<MouseEvent>(canvasEl, 'mousedown');
        const upStream$ = fromEvent<MouseEvent>(canvasEl, 'mouseup');
        const moveStream$ = fromEvent<MouseEvent>(canvasEl, 'mousemove');
        const sub = downStream$
            .pipe(
                switchMap((_) => {
                    console.log('%cswitchMap', 'color: pink');
                    return moveStream$.pipe(
                        takeUntil(upStream$),
                        map((e) => {
                            const target = e.target as HTMLCanvasElement;
                            // console.log(e);
                            // throw Error('Big fucking error!!!');
                            // /* eslint-disable */
                            return {
                                x: e.offsetX,
                                y: e.offsetY,
                                ctx: target && target.getContext('2d'),
                            };
                        }),
                    );
                }),
            )
            .subscribe({
                next(drawObj) {
                    console.log('%cdrawObj', 'color: olive', drawObj);
                    const { x, y, ctx } = drawObj;
                    if (!ctx) return;
                    drawLine(ctx, {
                        x, y,
                    });
                },
                error(err) {
                    console.log('%cERROR', 'color: red', err);
                },
                complete() {
                    console.log('%cDONE', 'color: azure');
                },
            });

        // Set canvas size
        canvasEl.width = el.clientWidth;
        canvasEl.height = el.clientHeight;

        return () => {
            if (canvasEl) {
                sub.unsubscribe();
            }
        };
    }, []);

    return (
        <div id="pt-canvas-container" className="pt-canvas-container">
            <canvas ref={canvasRef} width={windowSize[0]} height={windowSize[1]} />
        </div>
    );

});

export default BasicLayout;
