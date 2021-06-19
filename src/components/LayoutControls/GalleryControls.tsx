import {
    FC, useContext,
} from 'react';
import {
    useHistory,
} from 'react-router-dom';
import { runInAction, toJS } from 'mobx';
import AppContext from 'aux/AppContext';
import LayoutContext from 'aux/LayoutContext';
import SimpleControl from 'atomicComponents/Control/SimpleControl';
import { getFormData, http } from 'libs/lib';

interface Props {}

const GalleryControls: FC<Props> = () => {
    const { mainCanvas } = useContext(AppContext);
    const { galleryFormRef } = useContext(LayoutContext);
    const history = useHistory();
    const goBackHandler = () => history.goBack();
    const deleteItemsHandler = async () => {
        const { current: galleryForm } = galleryFormRef;
        if (!galleryForm) return;

        const items = galleryForm.querySelectorAll('input[type="checkbox"]');
        console.log(items);

        const fields = getFormData(galleryForm);
        console.log(fields);
        // console.log(Object.entries(galleryForm.elements));
        const entries = Object.entries(fields);
        const keys = entries
            .filter((item) => item[1])
            .flat();

        console.log('keys', keys);
        if (keys.length) {
            const gallery = toJS(mainCanvas.getGallery);
            console.log(gallery);
            const toDeleteItems: string[] = [];
            const galleryMod: GalleryObj[] = [];
            gallery.forEach((item) => {
                if (keys.includes(item.id)) toDeleteItems.includes(item.image);
                else galleryMod.push(item);
            });

            // keys.forEach((item) => {
            //     const itemData = gallery.find((galleryItem) => galleryItem.id === item);
            //     if (itemData) toDeleteItems.push(itemData.image);

            // });
            console.log('toDeleteItems', toDeleteItems);
            if (!toDeleteItems.length) return;

            const response = await http<{
                result: 'ok',
            }>('http://localhost:8081/api/gallery-data', {
                headers: {
                    'Content-type': 'application/json',
                },
                method: 'DELETE',
                body: JSON.stringify(toDeleteItems),
            });
            console.log('response', response);
            runInAction(() => {
                mainCanvas.setGallery(galleryMod);
            });
        }
    };

    return (
        <div className="columns">
            <div className="column is-narrow">
                <SimpleControl {...{
                    cssClass: 'button is-warning is-outlined',
                    ariaLabel: 'Go back',
                    callback: goBackHandler,
                    text: 'Go back',
                }}
                />
            </div>
            <div className="column">&nbsp;</div>
            <div className="column is-narrow">
                <SimpleControl {...{
                    cssClass: 'button is-danger',
                    ariaLabel: 'Delete gallery items',
                    callback: deleteItemsHandler,
                    text: 'Delete',
                }}
                />
            </div>
        </div>
    );
};

export default GalleryControls;
