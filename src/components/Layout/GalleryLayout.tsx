import {
    FC, useContext, useState, MouseEvent,
} from 'react';
import { action, toJS } from 'mobx';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import LayoutContext from 'aux/LayoutContext';
import { uniOnOpenHandler } from 'libs/lib';
import GalleryControls from 'components/LayoutControls/GalleryControls';
import GalleryCard from 'components/Gallery/GalleryCard';
import LazyPopup from 'components/Modals/LazyPopup';

interface Props {}

const GalleryLayout: FC<Props> = observer(() => {
    console.log('%cGalleryLayout', 'color: blue;');
    const { mainCanvas } = useContext(AppContext);
    const { galleryFormRef } = useContext(LayoutContext);
    const gallery = mainCanvas.getGallery;
    const [popupImage, setPopupImage] = useState('');

    const openHandler = action(
        'openPopupGalleryPopupAction',
        (e: MouseEvent) => {
            e.stopPropagation();
            const target = e.currentTarget as HTMLHRElement;
            const cleanId = target.id.replace('img-', '');
            const popupObj = gallery.find((item) => item.id === cleanId);

            if (!popupObj) return;

            setPopupImage(`./uploads/${popupObj.image}`);
            uniOnOpenHandler(mainCanvas, 'galleryPopup', {
                type: 'gallery-popup',
                parent: '',
                child: '',
            });
        },
    );

    const closeHandler = action(
        'closePopupGalleryPopupAction',
        (e: MouseEvent) => {
            e.stopPropagation();
            setPopupImage('');
            mainCanvas.unsetModals('galleryPopup');
        },
    );

    console.log('%cGalleryLayout ===>', 'color: tomato', gallery);

    if (!gallery.length) {
        return <div className="pt-gallery" />;
    }

    return (
        <div className="pt-on-top pt-on-top-canvas">
            <div className="pt-navbar pt-navbar-top">
                <GalleryControls />
            </div>
            <div className="pt-canvas-container">
                <div className="pt-gallery-wrapper">
                    <form ref={galleryFormRef}>
                        <div className="pt-gallery">
                            {
                                gallery.map((item) => {
                                    const cleanItem = toJS(item);
                                    return (
                                        <GalleryCard
                                            key={cleanItem.id}
                                            clickHandler={openHandler}
                                            {...cleanItem}
                                        />
                                    );
                                })
                            }
                        </div>
                    </form>
                    <LazyPopup url={popupImage} closeHandler={closeHandler} />
                </div>
            </div>
        </div>
    );
});

export default GalleryLayout;
