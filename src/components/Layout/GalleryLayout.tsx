import {
    FC, useContext,
} from 'react';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import LayoutContext from 'aux/LayoutContext';
import StepControls from 'components/LayoutControls/StepControls';
import GalleryCard from 'components/Gallery/GalleryCard';

interface Props {}

const GalleryLayout: FC<Props> = observer(() => {
    console.log('%cBasicLayout', 'color: olive;');
    const { mainCanvas } = useContext(AppContext);
    const { canvasRef, galleryFormRef } = useContext(LayoutContext);
    const gallery = mainCanvas.getGallery;

    console.log('%cgallery ===>', 'color: red', gallery);
    console.log('%clocation ===>', 'color: red', window.location);

    if (!gallery.length) {
        return <div className="pt-gallery" />;
    }

    console.log('XXX', gallery);

    return (
        <div className="pt-gallery-wrapper">
            <form ref={galleryFormRef}>
                <div className="pt-gallery">
                    {
                    gallery.map((item) => {
                        const {
                            id, title, descr, image,
                        } = item;
                        return (
                            <GalleryCard
                                key={id}
                                {...{
                                    id, title, descr, image,
                                }}
                            />
                        );

                    })
                }
                </div>
            </form>
        </div>
    );
});

export default GalleryLayout;
