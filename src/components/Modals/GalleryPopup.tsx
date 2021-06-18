import {
    MouseEvent, useContext, FC,
} from 'react';
import LayoutContext from 'aux/LayoutContext';
import SimpleControl from 'atomicComponents/Control/SimpleControl';

interface Props {
    url: string;
}

const GalleryPopup: FC<Props> = ({ url }) => {
    console.log('Save to gallery prompt modal');
    const {
        modals: {
            galleryPopupModalRef,
        },
    } = useContext(LayoutContext);
    const closeHandler = (e: MouseEvent) => {
        e.stopPropagation();
        const { current: modalEl } = galleryPopupModalRef;
        if (!modalEl) return;
        modalEl.classList.remove('is-active');
    };

    return (
        <div ref={galleryPopupModalRef} className="modal" role="dialog">
            <div className="modal-background" />
            <div className="modal-content pt-helper-width-auto">
                <img src={url} alt="" />
            </div>
            <SimpleControl {...{
                cssClass: 'modal-close is-large',
                ariaLabel: 'Close modal',
                callback: closeHandler,
                text: '',
            }}
            />
        </div>
    );
};

export default GalleryPopup;
