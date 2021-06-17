import { ComponentType } from 'react';
import { uniOnCloseHandler } from 'libs/lib';
import BasicModal from 'atomicComponents/Modal/BasicModal';
import SimpleModal from 'atomicComponents/Modal/SimpleModal';
import SimpleControl from 'atomicComponents/Control/SimpleControl';

const modalOptsDefaults: ModalOpts<BasicModalSpec> = {
    type: 'basic',
    modalSpec: {
        title: 'Modal title',
        Controls: () => (
            <>
                <SimpleControl {...{
                    cssClass: 'is-warning',
                    ariaLabel: 'Close modal',
                    callback: uniOnCloseHandler,
                    text: 'Cancel',
                }}
                />
            </>
        ),
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
