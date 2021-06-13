import { ComponentType } from 'react';
import BasicModal from 'atomicComponents/Modal/BasicModal';
import SimpleModal from 'atomicComponents/Modal/SimpleModal';

const modalOptsDefaults: ModalOpts<BasicModalSpec> = {
    type: 'basic',
    modalSpec: {
        title: 'Modal title',
        controls: () => <div>Modal controls</div>,
    },
};

function modalComponent<T>(
    ComponentToWrap: ComponentType<T>,
    opts: ModalOpts<BasicModalSpec> = modalOptsDefaults,
) {
    const displayName = ComponentToWrap.displayName || ComponentToWrap.name || '';
    const { type, modalSpec } = opts;
    const mapper: {
        [name: string]: ComponentType<BasicModalSpec>;
    } = {
        basic: BasicModal,
        simple: SimpleModal,
    };
    const Wrapper = mapper[type];

    const WrappedComponent = (props: T) => (
        <Wrapper {...modalSpec}>
            <ComponentToWrap {...props} />
        </Wrapper>
    );

    WrappedComponent.displayName = `modalComponent(${displayName})`;

    return WrappedComponent;
}

export default modalComponent;
