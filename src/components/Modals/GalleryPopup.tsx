import {
    useContext, FC,
} from 'react';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import LayoutContext from 'aux/LayoutContext';
import SimpleControl from 'atomicComponents/Control/SimpleControl';

interface Props extends PopupProps {}

const GalleryPopup: FC<Props> = observer(({
    url,
    closeHandler,
}) => {
    console.log('%cGalleryPopup', 'color: gold');
    const { mainCanvas } = useContext(AppContext);
    const currentModal = mainCanvas.getModals.galleryPopup;
    const typesToOpen = ['gallery-popup'];
    const {
        modals: {
            galleryPopupModalRef,
        },
    } = useContext(LayoutContext);

    return (
        <div
            ref={galleryPopupModalRef}
            className={`modal${typesToOpen.includes(currentModal.type) ? ' is-active' : ''}`}
        >
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
});

export default GalleryPopup;
