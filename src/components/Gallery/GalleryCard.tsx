import {
    FC, useEffect, useState, useContext, MouseEvent,
} from 'react';
import AppContext from 'aux/AppContext';
import { uniOnOpenHandler, resizeImageToString } from 'libs/lib';
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
    const { mainCanvas } = useContext(AppContext);
    const clickHandler = (e: MouseEvent) => {
        e.stopPropagation();
        uniOnOpenHandler(mainCanvas, {
            type: 'gallery-popup',
            parent: '',
            child: '',
        });
    };

    useEffect(() => {
        console.log('%cRESIZE - first effect', 'color: purple; font-weight: bold;');
        (async () => {
            const img = document.createElement('img');
            img.src = popupImageUrl;
            img.addEventListener('load', async () => {
                const preview = await resizeImageToString(img, {
                    width: 400,
                    height: 235,
                });
                setResizedImage(preview);
            });
        })();
    }, [popupImageUrl]);

    return (
        <div className="card">
            <div className="card-image">
                <figure className="image">
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
                            <label className="checkbox" htmlFor={id}>
                                <input id={id} type="checkbox" />
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
