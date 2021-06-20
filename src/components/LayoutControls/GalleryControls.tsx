import {
    FC, useContext,
} from 'react';
import {
    useHistory,
} from 'react-router-dom';
import { toJS, action } from 'mobx';
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
    const deleteItemsHandler = action('deleteGalleryItemsAction', async () => {
        const { current: galleryForm } = galleryFormRef;
        if (!galleryForm) return;

        const fields = getFormData(galleryForm);
        const entries = Object.entries(fields);
        const keys: string[] = [];
        entries.forEach((item) => {
            if (item[1]) {
                keys.push(item[0].replace('chbox-', ''));
            }
        });

        if (keys.length) {
            const gallery = toJS(mainCanvas.getGallery);
            const toDeleteItems: string[] = [];
            const galleryMod: GalleryObj[] = [];

            gallery.forEach((item) => {
                if (keys.includes(item.id)) toDeleteItems.push(item.image);
                else galleryMod.push(item);
            });

            if (!toDeleteItems.length) return;

            const response = await http<{
                result: true,
            }>('http://localhost:8081/api/gallery-data', {
                headers: {
                    'Content-type': 'application/json',
                },
                method: 'DELETE',
                body: JSON.stringify(toDeleteItems),
            });

            if (response.result) {
                mainCanvas.setGallery(galleryMod);
            }
        }
    });

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
