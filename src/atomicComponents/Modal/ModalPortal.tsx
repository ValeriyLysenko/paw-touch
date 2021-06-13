import {
    ReactNode, useContext, useEffect, useRef, forwardRef,
} from 'react';
import { createPortal } from 'react-dom';
import LayoutContext from 'aux/LayoutContext';

interface Ref extends HTMLDivElement {}

interface Props {
    children?: ReactNode;
}

const ModalPortal = forwardRef<Ref, Props>(({
    children,
}, ref) => {
    const { modalsWrapperRef } = useContext(LayoutContext);
    const modalRef = useRef<HTMLDivElement>(document.createElement('div'));

    useEffect(() => {
        const { current: modalsWrapper } = modalsWrapperRef;
        const { current: modal } = modalRef;

        if (!modalsWrapper) return;
        if (!modal) return;

        modalsWrapper.appendChild(modal);

        return () => void modalsWrapper.removeChild(modal); /* eslint-disable-line */
    }, [modalsWrapperRef, children, ref]);

    return createPortal(<div ref={ref}>{children}</div>, modalRef.current);
});

export default ModalPortal;
