import {
    MouseEvent, useContext, FC,
} from 'react';
import LayoutContext from 'aux/LayoutContext';
import SimpleControl from 'atomicComponents/Control/SimpleControl';

interface Props {
    callback?: Function;
}

const SaveToGalleryPrompt: FC<Props> = ({
    callback,
}) => {
    console.log('Save to gallery prompt modal');
    const {
        modals: { saveToGalleryModalRef, saveToGalleryPropmptModalRef },
    } = useContext(LayoutContext);
    const closeHandler = (e: MouseEvent) => {
        e.stopPropagation();
        const { current: modalEl } = saveToGalleryPropmptModalRef;
        if (!modalEl) return;

        // Call outside callback if any
        if (callback) callback();

        modalEl.classList.remove('is-active');
    };
    const yesHandler = (e: MouseEvent) => {
        e.stopPropagation();
        const { current: modalEl } = saveToGalleryPropmptModalRef;
        if (!modalEl) return;
        modalEl.classList.remove('is-active');

        const { current: modalToOpenEl } = saveToGalleryModalRef;
        if (!modalToOpenEl) return;
        modalToOpenEl.classList.add('is-active');
    };

    return (
        <div ref={saveToGalleryPropmptModalRef} className="modal">
            <div className="modal-background" />
            <div className="modal-card">
                <header className="modal-card-head">
                    <div className="modal-card-title pt-modal-title">
                        Vital question
                    </div>
                    <button
                        className="delete"
                        aria-label="Close modal"
                        onClick={closeHandler}
                    />
                </header>
                <section className="modal-card-body">
                    <div className="block">
                        Do you want to save your masterpiece in the gallery?
                    </div>
                </section>
                <footer className="modal-card-foot pt-helper-space-between">
                    <SimpleControl {...{
                        cssClass: 'button is-success',
                        ariaLabel: 'Affirmative answer',
                        callback: yesHandler,
                        text: 'Yes',
                    }}
                    />
                    <SimpleControl {...{
                        type: 'submit',
                        cssClass: 'button is-warning',
                        ariaLabel: 'Negative answer',
                        callback: closeHandler,
                        text: 'No',
                    }}
                    />
                </footer>
            </div>
        </div>
    );
};

export default SaveToGalleryPrompt;
