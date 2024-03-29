import {
    FC, ReactNode, useEffect, useRef,
} from 'react';

interface Props {
    children?: ReactNode,
    dragHandle?: string,
}

const Draggable: FC<Props> = ({
    children,
    dragHandle,
}) => {
    const draggableRef = useRef<HTMLDivElement>(null);
    const dragStart = () => false;

    useEffect(() => {
        const getCoords = (el: HTMLDivElement) => {
            const box = el.getBoundingClientRect();
            const { pageXOffset, pageYOffset } = window;
            return {
                top: box.top + pageYOffset,
                left: box.left + pageXOffset,
            };
        };
        const moveAt = (
            e: MouseEvent,
            el: HTMLDivElement,
            shift: {
                x: number,
                y: number,
            },
        ) => {
            el.style.left = `${e.pageX - shift.x}px`; // eslint-disable-line
            el.style.top = `${e.pageY - shift.y}px`; // eslint-disable-line
        };
        const mouseDownHandler = (e: MouseEvent) => {
            e.preventDefault();
            const currentTarget = e.currentTarget as HTMLDivElement;
            if (!currentTarget) return;

            const dragEl = currentTarget.closest('.pt-draggable') as HTMLDivElement;
            if (!dragEl) return;

            const coords = getCoords(dragEl);
            const shift = {
                x: e.pageX - coords.left,
                y: e.pageY - coords.top,
            };

            dragEl.setAttribute('style', 'position: absolute; z-index: 1000;');
            // document.body.appendChild(dragEl);
            moveAt(e, dragEl, shift);

            document.onmousemove = (ev) => {
                ev.preventDefault();
                moveAt(ev, dragEl, shift);
            };
            dragEl.onmouseup = () => {
                document.onmousemove = null;
                dragEl.onmouseup = null;
            };
        };

        const { current: draggableEl } = draggableRef;

        if (!draggableEl || !dragHandle) return;

        const els = document.querySelectorAll(`.${dragHandle}`) as NodeListOf<HTMLDivElement>;
        if (els) {
            els.forEach((el) => {
                el.addEventListener('mousedown', mouseDownHandler);
            });
        }

        return () => {
            if (els) {
                els.forEach((el) => {
                    el.removeEventListener('mousedown', mouseDownHandler);
                });
            }

        };
    }, [dragHandle]);

    return (
        <div
            onDragStart={dragStart}
            role="presentation"
            ref={draggableRef}
            className="pt-draggable"
        >
            {children}
        </div>
    );
};

export default Draggable;
