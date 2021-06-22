import {
    MouseEvent, ChangeEvent, useContext, useState, useRef, useReducer, FC,
} from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { nanoid } from 'nanoid';
import AppContext from 'aux/AppContext';
import LayoutContext from 'aux/LayoutContext';

import SimpleControl from 'atomicComponents/Control/SimpleControl';
import { sendBlobToServer } from 'libs/lib';

interface Props extends ModalsProps {}

const SaveToGallery: FC<Props> = observer(({
    callback,
}) => {
    console.log('Save to gallery modal');
    const { mainCanvas } = useContext(AppContext);
    const currentModal = mainCanvas.getModals.saveToGallery;
    const typesToOpen = ['save-to-gallery'];
    const { canvasRef } = useContext(LayoutContext);
    const { modals: { saveToGalleryModalRef } } = useContext(LayoutContext);
    const [, forceUpdate] = useReducer((x) => x + 1, 0);
    const formDataRef = useRef({
        pristineForm: true,
    });
    const [pending, setPending] = useState(false);
    const [responseStatus, setResponseStatus] = useState('');
    const [title, setTitle] = useState('');
    const [descr, setDescr] = useState('');
    const onTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation();
        const target = e.target as HTMLInputElement;
        formDataRef.current.pristineForm = false;
        setTitle(target.value);
    };

    const onDescrChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        e.stopPropagation();
        const target = e.target as HTMLTextAreaElement;
        setDescr(target.value);
    };

    const closeHandler = action('closePopupSaveToGalleryAction', (e: MouseEvent) => {
        e.stopPropagation();

        // Prevent closing while server communication is on process
        if (pending) return;

        setTitle('');
        setDescr('');
        formDataRef.current.pristineForm = true;
        setResponseStatus('');

        mainCanvas.unsetModals('saveToGallery');

        // Call outside callback if any
        if (callback) callback();
    });

    const saveHandler = action('saveToGalleryAction', (e: MouseEvent) => {
        e.stopPropagation();

        const { current: canvas } = canvasRef;
        if (!canvas) return;

        if (!title) {
            formDataRef.current.pristineForm = false;
            forceUpdate();
            return;
        }

        setPending(true);
        setTimeout(async () => {
            // mainCanvas.uploadImage(canvas);
            const response = await sendBlobToServer<{
                name: string
            }>(canvas, {
                imageType: 'image/png',
                imageQuality: 1,
            });

            setPending(false);

            if (response) {
                setResponseStatus('success');
                const data = {
                    id: nanoid(),
                    title,
                    descr,
                    image: response.name || '',
                };
                mainCanvas.setGalleryItem(data);

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
        <div
            ref={saveToGalleryModalRef}
            className={`modal${currentModal && typesToOpen.includes(currentModal.type) ? ' is-active' : ''}`}
        >
            <div className="modal-background" />
            <div className="modal-card">
                <header className="modal-card-head">
                    <div className="modal-card-title pt-modal-title">
                        Save to gallery
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
                    <form>
                        <div className="block">
                            <input
                                name="title"
                                id="title"
                                className={`input${!title && !formDataRef.current.pristineForm ? ' is-danger' : ''}`}
                                type="text"
                                placeholder="Title"
                                onChange={onTitleChange}
                                value={title}
                            />
                        </div>
                        <div className="block">
                            <textarea
                                name="descr"
                                id="descr"
                                className="textarea"
                                placeholder="Description"
                                onChange={onDescrChange}
                                value={descr}
                            />
                        </div>
                    </form>
                </section>
                <footer className="modal-card-foot is-justify-content-space-between">
                    <SimpleControl {...{
                        cssClass: 'button is-success',
                        ariaLabel: 'Save modal',
                        callback: saveHandler,
                        text: 'Save',
                        type: 'submit',
                        disabled: pending,
                    }}
                    />
                    <SimpleControl {...{
                        type: 'submit',
                        cssClass: 'button is-warning',
                        ariaLabel: 'Close modal',
                        callback: closeHandler,
                        text: 'Cancel',
                        disabled: pending,
                    }}
                    />
                </footer>
            </div>
        </div>
    );
});

export default SaveToGallery;
