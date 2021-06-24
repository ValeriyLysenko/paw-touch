import {
    FC, Suspense, lazy,
} from 'react';
import ModalPortal from 'atomicComponents/Modal/ModalPortal';
import Loading from 'atomicComponents/Loading/Loading';

interface Props extends PopupProps {}

const LazyPopup: FC<Props> = ({
    url,
    closeHandler,
}) => {
    const LazyGalleryPopup = lazy(() => new Promise((resolve) => {
        setTimeout(() => resolve(import('atomicComponents/Modal/SimpleModal') as Promise<{default: never}>), 3000);
    }));

    return (
        <Suspense fallback={<Loading />}>
            {
            url ? (
                <ModalPortal>
                    <LazyGalleryPopup
                        closeHandler={closeHandler}
                        spec={{ type: 'gallery-popup', name: 'galleryPopup' }}
                    >
                        <img src={url} alt="" />
                    </LazyGalleryPopup>
                </ModalPortal>
            ) : null
        }
        </Suspense>
    );
};

export default LazyPopup;
