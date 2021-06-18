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
    const popupImageUrl = `./uploads/${image}`;
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
            const img = document.createElement('img');
            img.src = popupImageUrl;
            img.addEventListener('load', async () => {
                const preview = await resizeImageToString(img, {
                    width: 400,
                    height: 400,
                });
                setResizedImage(preview);
            });
        })();
    }, [popupImageUrl]);

    return (
        <div className="card">
            <div className="card-image">
                <figure className="image is-4by3">
                    <a onClick={clickHandler} role="presentation">
                        <img src={resizedImage} alt="" />
                    </a>
                </figure>
                <ModalPortal>
                    <GalleryPopup url={popupImageUrl} />
                </ModalPortal>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">{title}</p>
                        <p className="subtitle is-6">
                            <label className="checkbox" htmlFor={`del-${id}`}>
                                <input id={`del-${id}`} type="checkbox" />
                                    &nbsp;Delete
                            </label>
                        </p>
                        {/* <p className="subtitle is-6">@johnsmith</p> */}
                    </div>
                </div>
                <div className="content">
                    {descr}
                </div>
            </div>
        </div>
    );
};

export default GalleryCard;
