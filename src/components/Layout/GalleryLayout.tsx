import {
    FC, useContext,
} from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import LayoutContext from 'aux/LayoutContext';
import GalleryControls from 'components/LayoutControls/GalleryControls';
import GalleryCard from 'components/Gallery/GalleryCard';

interface Props {}

const GalleryLayout: FC<Props> = observer(() => {
    console.log('%cBasicLayout', 'color: olive;');
    const { mainCanvas } = useContext(AppContext);
    const { galleryFormRef } = useContext(LayoutContext);
    const gallery = mainCanvas.getGallery;

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
                                            {...cleanItem}
                                        />
                                    );
                                })
                            }
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
});

export default GalleryLayout;
