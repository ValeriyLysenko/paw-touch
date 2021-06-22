import {
    MouseEvent, useContext, FC, useState,
} from 'react';
import { toJS, action } from 'mobx';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import LayoutContext from 'aux/LayoutContext';
import SimpleControl from 'atomicComponents/Control/SimpleControl';
import { getFormData, http } from 'libs/lib';

interface Props extends ModalsProps {}

const DeleteFromGalleryPrompt: FC<Props> = observer(({
    callback,
}) => {
    console.log('Save to gallery prompt modal');
    const [pending, setPending] = useState(false);
    const [responseStatus, setResponseStatus] = useState('');
    const { mainCanvas } = useContext(AppContext);
    const currentModal = mainCanvas.getModals.deleteFromGallery;
    const typesToOpen = ['delete-from-gallery'];
    const {
        galleryFormRef,
        modals: { saveToGalleryPromptModalRef },
    } = useContext(LayoutContext);

    const closeHandler = action('closePopupDeleteFromGalleryPromptAction', (e: MouseEvent) => {
        e.stopPropagation();

        // Prevent closing while server communication is on process
        if (pending) return;

        mainCanvas.unsetModals('deleteFromGallery');

        // Call outside callback if any
        if (callback) callback();
    });

    const yesHandler = action('deleteItemsFromGalleryAction', (e: MouseEvent) => {
        e.stopPropagation();

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

        if (!keys.length) return;

        const gallery = toJS(mainCanvas.getGallery);
        const toDeleteItems: string[] = [];
        const galleryMod: GalleryObj[] = [];

        gallery.forEach((item) => {
            if (keys.includes(item.id)) toDeleteItems.push(item.image);
            else galleryMod.push(item);
        });

        if (!toDeleteItems.length) return;

        setPending(true);
        setTimeout(async () => {
            const response = await http<ServerResponse<{}>>(
                'http://localhost:8081/api/gallery-data', {
                    headers: {
                        'Content-type': 'application/json',
                    },
                    method: 'DELETE',
                    body: JSON.stringify(toDeleteItems),
                },
            );

            setPending(false);

            if (!response.error) {
                setResponseStatus('success');
                mainCanvas.setGallery(galleryMod);

                // Call outside callback if any
                if (callback) callback();

                setTimeout(() => {
                    closeHandler(e);
                }, 1000);
            } else {
                setResponseStatus('error');
            }
        }, 2000);
    });

    console.log('%cDeleteFromGalleryPrompt', 'color: red', callback);

    return (
        <div
            ref={saveToGalleryPromptModalRef}
            className={`modal${currentModal && typesToOpen.includes(currentModal.type) ? ' is-active' : ''}`}
        >
            <div className="modal-background" />
            <div className="modal-card">
                <header className="modal-card-head">
                    <div className="modal-card-title pt-modal-title">
                        A matter of life and death
                        {pending
                        && (
                            <button className="button is-loading">
                                Loading button
                            </button>
                        )}
                        {responseStatus === 'success'
                            ? <span className="tag is-success is-light">Success</span>
                            : responseStatus === 'error'
                                ? <span className="tag is-danger is-light">Error</span>
                                : null}
                    </div>
                    <button
                        className="delete"
                        aria-label="Close modal"
                        onClick={closeHandler}
                    />
                </header>
                <section className="modal-card-body">
                    <div className="block">
                        Are you sure you want to delete the selected items permanently?
                    </div>
                </section>
                <footer className="modal-card-foot is-justify-content-space-between">
                    <SimpleControl {...{
                        cssClass: 'button is-success',
                        ariaLabel: 'Affirmative answer',
                        callback: yesHandler,
                        text: 'Yes',
                        disabled: pending,
                    }}
                    />
                    <SimpleControl {...{
                        type: 'submit',
                        cssClass: 'button is-warning',
                        ariaLabel: 'Negative answer',
                        callback: closeHandler,
                        text: 'No',
                        disabled: pending,
                    }}
                    />
                </footer>
            </div>
        </div>
    );
});

export default DeleteFromGalleryPrompt;
