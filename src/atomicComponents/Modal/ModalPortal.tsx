import {
    FC, ReactNode, useContext, useEffect, useRef,
} from 'react';
import { createPortal } from 'react-dom';
import LayoutContext from 'aux/LayoutContext';

interface Props {
    children?: ReactNode;
}

const ModalPortal: FC<Props> = ({
    children,
}) => {
    const { modalsWrapperRef } = useContext(LayoutContext);
    const modalRef = useRef<HTMLDivElement>(document.createElement('div'));

    useEffect(() => {
        const { current: modalsWrapper } = modalsWrapperRef;
        const { current: modal } = modalRef;

        if (!modalsWrapper) return;
        if (!modal) return;

        modalsWrapper.appendChild(modal);

        return () => void modalsWrapper.removeChild(modal); /* eslint-disable-line */
    }, [modalsWrapperRef]);

    return createPortal(children, modalRef.current);
};

export default ModalPortal;
