import { FC, ComponentType } from 'react';
import Draggable from './Draggable';
import Droppable from './__Droppable';

// interface Props {
//     ComponentToWrap: ComponentType,
//     opts?: {
//         drop?: boolean,
//     },
// }

const dragComponent = (
    ComponentToWrap: ComponentType,
    opts?: {
        drop?: boolean,
        dragHandle?: string,
    },
) => {
    const spec = opts || {};

    if (!spec.drop) {
        const { dragHandle = '' } = spec;
        const finalProps = {
            dragHandle: dragHandle || '',
        };
        return () => (
            <Draggable {...finalProps}>
                <ComponentToWrap />
            </Draggable>
        );
    }

    return () => (
        <div>DROPPABLE</div>
        // <Droppable opts={{}}>
        //     <ComponentToWrap />
        // </Droppable>
    );
};

export default dragComponent;
