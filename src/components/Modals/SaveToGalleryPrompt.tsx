import {
    MouseEvent, useContext, FC,
} from 'react';
import NavigationContext from 'aux/NavigationContext';
import SimpleControl from 'atomicComponents/Control/SimpleControl';

interface Props {
        callback?: Function;
}

const SaveToGalleryPrompt: FC<Props> = ({
    callback,
}) => {
    console.log('Save to gallery prompt modal');
    const { saveToGalleryModalRef, saveToGalleryPropmptModalRef } = useContext(NavigationContext);
    const onClose = (e: MouseEvent) => {
        e.stopPropagation();
        const { current: modalEl } = saveToGalleryPropmptModalRef;
        if (!modalEl) return;

        // Call outside callback if any
        if (callback) callback();

        modalEl.classList.remove('is-active');
    };
    const onYes = (e: MouseEvent) => {
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
                        onClick={onClose}
                    />
                </header>
                <section className="modal-card-body">
                    <div className="block">
                        Do you want to save your masterpiece in the gallery?
                    </div>
                </section>
                <footer className="modal-card-foot pt-helper-space-between">
                    <SimpleControl {...{
                        cssClass: 'is-success',
                        ariaLabel: 'Affirmative answer',
                        callback: onYes,
                        text: 'Yes',
                    }}
                    />
                    <SimpleControl {...{
                        type: 'submit',
                        cssClass: 'is-warning',
                        ariaLabel: 'Negative answer',
                        callback: onClose,
                        text: 'No',
                    }}
                    />
                </footer>
            </div>
        </div>
    );
};

export default SaveToGalleryPrompt;
