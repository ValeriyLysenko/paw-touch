import { ComponentType } from 'react';
import Draggable from './Draggable';

function dragComponent<T>(
    ComponentToWrap: ComponentType<T>,
    opts?: {
        dragHandle?: string,
    },
) {
    const displayName = ComponentToWrap.displayName || ComponentToWrap.name || '';
    const spec = opts || {};
    const { dragHandle } = spec;
    const wrappedProps = {
        dragHandle: dragHandle || '',
    };

    const WrappedComponent = (props: T) => (
        <Draggable {...wrappedProps}>
            <ComponentToWrap {...props} />
        </Draggable>
    );

    WrappedComponent.displayName = `dragComponent(${displayName})`;

    return WrappedComponent;
}

export default dragComponent;
