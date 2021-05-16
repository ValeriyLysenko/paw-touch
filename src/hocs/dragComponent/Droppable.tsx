import {
    FC, ReactNode, useCallback, useEffect, useState, useRef,
} from 'react';

interface Props {
    children: ReactNode,
    dragHandle?: string,
    drag?: boolean,
    drop?: boolean,
}

const Draggable: FC<Props> = ({
    children,
    dragHandle,
    drag,
    drop,
}) => {
    console.log('%cDraggable', 'color: red', children);
    const [isDraggable, setDraggable] = useState(!dragHandle);
    const draggableRef = useRef(null);
    const dragStart = useCallback((e) => {

        console.log('dragStart', e);
        console.log('dragStart', e.target);
        console.log('dragStart', e.currentTarget);
        const el = e.currentTarget;

        setTimeout(() => {
            el.classList.add('is-hidden');
        }, 0);
    }, []);
    const dragEnd = useCallback((e) => {
        console.log('dragEnd', e);
    }, []);
    const dragDrop = useCallback((e) => {
        console.log('dragDrop', e);
        e.preventDefault();
    }, []);
    const mouseDown = useCallback((e) => {
        // e.preventDefault();
        // console.log('mouseDown', e);
        // console.log('e.target', e.target);
        // console.log('e.currentTarget', e.currentTarget);
        // const target = e.target as HTMLDivElement;

        // if (target && dragHandle) {
        //     const { classList } = target;
        //     const classListToGo = Array.from(classList);
        //     console.log('classListToGo', classListToGo);
        //     if (Array.isArray(dragHandle)) {
        //         console.log('ARRAY');

        //         // if (dragHandle.some((item) => classListToGo.includes(item))) {
        //         if (dragHandle.some((item) => {
        //             console.log(classListToGo.includes(item));
        //             return classListToGo.includes(item);
        //         })) {
        //             setDraggable(true);
        //         } else {
        //             setDraggable(false);
        //         }
        //     } else {
        //         if (classListToGo.includes(dragHandle)) {
        //             setDraggable(true);
        //         } else {
        //             setDraggable(false);
        //         }
        //     }
        // }

    // }, [dragHandle]);
    }, []);
    console.log('%cisDraggable', 'color: green', isDraggable);

    useEffect(() => {
        console.log('%cuseEffect', 'color: pink');
        const draggableEl = draggableRef.current as HTMLDivElement | null;

        if (!draggableEl || !dragHandle) return;

        const els = document.querySelectorAll(`.${dragHandle}`) as NodeListOf<HTMLDivElement>;
        if (els) {
            els.forEach((el) => {
                el.addEventListener('mousedown', (e) => {
                    console.log('e.target', e.target);
                    console.log('e.currentTarget', e.currentTarget);
                    setDraggable(true);
                });
                el.addEventListener('mouseup', (e) => {
                    setDraggable(false);
                });
            });
        }

        return () => {
            if (els) {
                els.forEach((el) => {
                    el.removeEventListener('mousedown', () => {});
                    el.removeEventListener('mouseup', () => {});
                });
            }

        };
    }, [dragHandle]);
    console.log('RERENDER!!!');

    // function dragstart_handler(ev) {
    //     console.log('dragStart');
    //     // Change the source element's border to signify drag has started
    //     ev.currentTarget.style.border = 'dashed';
    //     ev.dataTransfer.setData('text', ev.target.id);
    // }

    // function dragover_handler(ev) {
    //     console.log('dragOver');
    //     // Change the target element's background color to signify a drag over event
    //     // has occurred
    //     ev.currentTarget.style.background = 'lightblue';
    //     ev.preventDefault();
    // }

    // function drop_handler(ev) {
    //     console.log('Drop');
    //     ev.preventDefault();
    //     const data = ev.dataTransfer.getData('text');
    //     ev.target.appendChild(document.getElementById(data));
    // }

    return (
        <div
            {...(isDraggable && { draggable: true })}
            onDragStart={dragStart}
            onDragEnd={dragEnd}
            onDrop={dragDrop}
            onMouseDown={mouseDown}
            role="presentation"
            ref={draggableRef}
        >
            {children}
        </div>
    );
};

export default Draggable;
