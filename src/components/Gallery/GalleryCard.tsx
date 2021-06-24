import {
    FC, useEffect, useState, MouseEvent,
} from 'react';
import { resizeImageToString } from 'libs/lib';

interface Props extends GalleryObj {
    clickHandler: (e: MouseEvent) => void ;
}

const GalleryCard: FC<Props> = ({
    id,
    title,
    descr,
    image,
    clickHandler,
}) => {
    console.log('%cGalleryCard ===>', 'color: red');
    const popupImageUrl = `./uploads/${image}`;
    const [resizedImage, setResizedImage] = useState('');

    useEffect(() => {
        console.log('%cRESIZE - first effect', 'color: purple; font-weight: bold;');
        (async () => {
            const resizer = async (imgage: HTMLImageElement) => {
                const preview = await resizeImageToString(imgage, {
                    width: 400,
                    height: 235,
                }, true);
                setResizedImage(preview);
            };
            const img = document.createElement('img');
            const boundResizer = resizer.bind(null, img);
            img.src = popupImageUrl;
            img.addEventListener('load', boundResizer);

            return () => {
                img.removeEventListener('load', boundResizer);
            };
        })();
    }, [popupImageUrl]);

    return (
        <div className="card">
            <div className="card-image">
                <figure className="image">
                    <a
                        onClick={clickHandler}
                        role="presentation"
                        id={`img-${id}`}
                    >
                        <img src={resizedImage} alt="" />
                    </a>
                </figure>
            </div>
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4" title={title}>{title}</p>
                        <p className="subtitle is-6">
                            <label className="checkbox" htmlFor={`chbox-${id}`}>
                                <input id={`chbox-${id}`} type="checkbox" />
                                    &nbsp;Delete
                            </label>
                        </p>
                    </div>
                </div>
                <div className="content" title={descr}>
                    {descr.length > 80 ? `${descr.substr(0, 80)}...` : descr}
                </div>
            </div>
        </div>
    );
};

export default GalleryCard;
