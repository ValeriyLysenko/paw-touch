import {
    FC, useEffect, useRef, useState, useContext, MouseEvent,
} from 'react';
import LayoutContext from 'aux/LayoutContext';
import { resizeImageToString } from 'libs/lib';
import ModalPortal from 'atomicComponents/Modal/ModalPortal';
import GalleryPopup from 'components/Modals/GalleryPopup';

interface Props extends GalleryObj {}

const GalleryCard: FC<Props> = ({
    id,
    title,
    descr,
    image,
}) => {
    console.log('%cGalleryCard ===>', 'color: red');
    const popupImageRef = useRef<HTMLImageElement | null>(null);
    const [resizedImage, setResizedImage] = useState('');
    const {
        modals: {
            galleryPopupModalRef,
        },
    } = useContext(LayoutContext);
    const clickHandler = (e: MouseEvent) => {
        e.stopPropagation();
        const { current: modalEl } = galleryPopupModalRef;
        if (!modalEl) return;
        modalEl.classList.add('is-active');
    };

    useEffect(() => {
        console.log('%cRESIZE - first effect', 'color: purple; font-weight: bold;');
        (async () => {
            const { current: popupImage } = popupImageRef;
            if (!popupImage) return;
            console.log('!!!!!!!', popupImage);
            console.dir(popupImage);
            // debugger; /* eslint-disable-line */
            // @ts-ignore
            // popupImage.onload(async () => {
            // popupImage.addEventListener('load', async () => {
            const preview = await resizeImageToString(popupImage, {
                width: 400,
                height: 400,
            });
            setResizedImage(preview);
            // });

            // return () =>

        })();
    }, [id]);

    return (
        <>
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <a onClick={clickHandler} role="presentation">
                            <img src={resizedImage} alt="" />
                        </a>
                    </figure>
                </div>
                <div className="card-content">
                    <form>
                        <div className="media">
                            {/* <div className="media-left">
                            <figure className="image is-48x48">
                                <img src="https://bulma.io/images/placeholders/96x96.png" alt="" />
                            </figure>
                        </div> */}
                            <div className="media-content">
                                {/* <img ref={popupImageRef} id={`popup-${id}`} src={`./uploads/${image}`} alt="" /> */}
                                <ModalPortal>
                                    <GalleryPopup url={`./uploads/${image}`} />
                                </ModalPortal>
                                <p className="title is-4">{title}</p>
                                <p className="subtitle is-6">
                                    <label className="checkbox" htmlFor={`del-${id}`}>
                                        <input id={`del-${id}`} type="checkbox" />
                                    &nbsp;Delete
                                    </label>
                                </p>
                                {/* <p className="subtitle is-6">@johnsmith</p> */}
                            </div>
                            <div className="content">
                                {descr}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <img ref={popupImageRef} id={`popup-${id}`} src={`./uploads/${image}`} alt="" />
        </>
    );
};

export default GalleryCard;
