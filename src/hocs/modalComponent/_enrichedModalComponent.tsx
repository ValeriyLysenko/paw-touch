import { ComponentType } from 'react';

function enrichedModalComponent<T, P>(
    ComponentToWrap: ComponentType<T>,
    injectedProps: P,
) {
    const displayName = ComponentToWrap.displayName || ComponentToWrap.name || '';
    const WrappedComponent = (props: T) => (
        <ComponentToWrap {...props} injected={injectedProps} />
    );

    WrappedComponent.displayName = `modalComponent(${displayName})`;

    return WrappedComponent;
}

export default enrichedModalComponent;
