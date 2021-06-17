import {
    MouseEvent, ChangeEvent, forwardRef, MutableRefObject, useContext, useState, useRef, useReducer,
} from 'react';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import LayoutContext from 'aux/LayoutContext';
import SimpleControl from 'atomicComponents/Control/SimpleControl';
import { sendBlobToServer } from 'libs/lib';

interface Ref extends HTMLDivElement {}

interface Props {}

const SaveToGallery = observer(forwardRef<Ref, Props>((props, ref) => {
    console.log('Basic modal');
    const { mainCanvas } = useContext(AppContext);
    const { canvasRef } = useContext(LayoutContext);
    const gallery = mainCanvas.getGallery;
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
    const onClose = (e: MouseEvent) => {
        e.stopPropagation();

        const { current: modalEl } = ref as MutableRefObject<HTMLDivElement>;
        if (!modalEl) return;
        modalEl.classList.remove('is-active');

        setTitle('');
        setDescr('');
        formDataRef.current.pristineForm = true;
        setResponseStatus('');
    };
    const onSubmit = (e: MouseEvent) => {
        e.stopPropagation();

        const { current: modalEl } = ref as MutableRefObject<HTMLDivElement>;
        if (!modalEl) return;

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
                    title,
                    descr,
                    image: response.name || '',
                };
                mainCanvas.setGalleryItem(data);
                setTimeout(() => {
                    onClose(e);
                }, 1500);
            } else {
                setResponseStatus('error');
            }

        }, 3500);

    };

    console.log('%cgallery ===>', 'color: red', gallery);

    return (
        <div ref={ref} className="modal">
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
                                : ''}
                    </div>
                    <button
                        className="delete"
                        aria-label="Close modal"
                        onClick={onClose}
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
                <footer className="modal-card-foot pt-helper-space-between">
                    <SimpleControl {...{
                        cssClass: 'is-success',
                        ariaLabel: 'Save modal',
                        callback: onSubmit,
                        text: 'Save',
                        type: 'submit',
                    }}
                    />
                    <SimpleControl {...{
                        type: 'submit',
                        cssClass: 'is-warning',
                        ariaLabel: 'Close modal',
                        callback: onClose,
                        text: 'Cancel',
                    }}
                    />
                    {/* <button className="button is-success">Save changes</button>
                    <button className="button">Cancel</button> */}
                </footer>
            </div>
        </div>
    );
}));

export default SaveToGallery;
