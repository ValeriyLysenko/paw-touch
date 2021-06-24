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
    console.log('DeleteFromGalleryPrompt modal');
    const [pending, setPending] = useState(false);
    const [responseStatus, setResponseStatus] = useState('');
    const { mainCanvas } = useContext(AppContext);
    const currentModal = mainCanvas.getModals.deleteFromGallery;
    const typesToOpen = ['delete-from-gallery'];
    const {
        galleryFormRef,
    } = useContext(LayoutContext);

    const deleteObj = ((): {
        toDelete: string[],
        galleryMod: GalleryObj[],
     } => {
        const { current: galleryForm } = galleryFormRef;
        const gallery = toJS(mainCanvas.getGallery);

        if (!galleryForm) {
            return {
                toDelete: [],
                galleryMod: gallery,
            };
        }

        const fields = getFormData(galleryForm);
        const entries = Object.entries(fields);
        const keys: string[] = [];
        entries.forEach((item) => {
            if (item[1]) {
                keys.push(item[0].replace('chbox-', ''));
            }
        });

        if (!keys.length) {
            return {
                toDelete: [],
                galleryMod: gallery,
            };
        }

        const toDelete: string[] = [];
        const galleryMod: GalleryObj[] = [];

        gallery.forEach((item) => {
            if (keys.includes(item.id)) toDelete.push(item.image);
            else galleryMod.push(item);
        });

        return {
            toDelete,
            galleryMod,
        };

    })();

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
        const { toDelete, galleryMod } = deleteObj;

        if (!toDelete.length) return;

        setPending(true);
        setTimeout(async () => {
            const response = await http<{}>(
                'http://localhost:8081/api/gallery-data', {
                    headers: {
                        'Content-type': 'application/json',
                    },
                    method: 'DELETE',
                    body: JSON.stringify(toDelete),
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

    return (
        <div className={`modal${currentModal && typesToOpen.includes(currentModal.type) ? ' is-active' : ''}`}>
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
                        {
                            deleteObj.toDelete.length
                                ? 'Are you sure you want to delete the selected items permanently?'
                                : 'You have to select at least one item.'
                        }

                    </div>
                </section>
                <footer className={`modal-card-foot ${
                    deleteObj.toDelete.length
                        ? ' is-justify-content-space-between'
                        : ' is-justify-content-flex-end'}`}
                >
                    { deleteObj.toDelete.length
                        ? (
                            <>
                                <SimpleControl {...{
                                    cssClass: 'button is-success',
                                    ariaLabel: 'Affirmative answer',
                                    callback: yesHandler,
                                    text: 'Yes',
                                    disabled: pending,
                                }}
                                />
                                <SimpleControl {...{
                                    cssClass: 'button is-warning',
                                    ariaLabel: 'Negative answer',
                                    callback: closeHandler,
                                    text: 'No',
                                    disabled: pending,
                                }}
                                />
                            </>
                        )
                        : (
                            <SimpleControl {...{
                                cssClass: 'button is-warning',
                                ariaLabel: 'Close modal',
                                callback: closeHandler,
                                text: 'Close',
                            }}
                            />
                        )}
                </footer>
            </div>
        </div>
    );
});

export default DeleteFromGalleryPrompt;
