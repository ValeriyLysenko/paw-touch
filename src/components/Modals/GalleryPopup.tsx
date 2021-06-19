import {
    MouseEvent, useContext, FC,
} from 'react';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import LayoutContext from 'aux/LayoutContext';
import SimpleControl from 'atomicComponents/Control/SimpleControl';

interface Props {
    url: string;
}

const GalleryPopup: FC<Props> = observer(({ url }) => {
    console.log('Save to gallery prompt modal');
    const { mainCanvas } = useContext(AppContext);
    const modals = mainCanvas.getModals;
    const typesToOpen = ['gallery-popup'];
    const {
        modals: {
            galleryPopupModalRef,
        },
    } = useContext(LayoutContext);
    const closeHandler = (e: MouseEvent) => {
        e.stopPropagation();
        runInAction(() => {
            mainCanvas.setModals({
                type: '',
                parent: '',
                child: '',
            });
        });
    };

    return (
        <div
            ref={galleryPopupModalRef}
            className={`modal${typesToOpen.includes(modals.type) ? ' is-active' : ''}`}
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
