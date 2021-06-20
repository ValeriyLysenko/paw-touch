import {
    FC, Suspense, lazy,
} from 'react';
import ModalPortal from 'atomicComponents/Modal/ModalPortal';
import Loading from 'atomicComponents/Loading/Loading';

interface Props extends PopupProps {}

const LazyGalleryPopup = lazy(() => new Promise((resolve) => {
    setTimeout(() => resolve(import('components/Modals/GalleryPopup') as Promise<{default: never}>), 3000);
}));

const LazyPopup: FC<Props> = ({
    url,
    closeHandler,
}) => {
    console.log('Lazy');
    return (
        <Suspense fallback={<Loading />}>
            {
            url ? (
                <ModalPortal>
                    <LazyGalleryPopup url={url} closeHandler={closeHandler} />
                </ModalPortal>
            ) : null
        }
        </Suspense>
    );
};

export default LazyPopup;
