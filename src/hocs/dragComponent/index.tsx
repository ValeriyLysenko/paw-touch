import { ComponentType } from 'react';
import Draggable from './Draggable';
import Droppable from './__Droppable';

const dragComponent = (
    ComponentToWrap: ComponentType<any>,
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
        return ({ ...props }) => (
            <Draggable {...finalProps}>
                <ComponentToWrap {...props} />
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
