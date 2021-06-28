import {
    MouseEvent, useContext, FC,
} from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import SimpleControl from 'atomicComponents/Control/SimpleControl';

interface Props extends ModalsProps {}

const SaveToGalleryPrompt: FC<Props> = observer(({
    callback,
}) => {
    const { mainCanvas } = useContext(AppContext);
    const currentModal = mainCanvas.getModals.newCanvas;
    const typesToOpen = ['new-canvas'];

    const closeHandler = action('closePopupSaveToGalleryPromptAction', (e: MouseEvent) => {
        e.stopPropagation();

        mainCanvas.unsetModals('newCanvas');

        // Call outside callback if any
        if (callback) callback();
    });

    const yesHandler = action('openPopupSaveToGalleryFromParentAction', (e: MouseEvent) => {
        e.stopPropagation();

        mainCanvas.setModals('saveToGallery', {
            type: 'save-to-gallery',
            parent: 'new-canvas',
            child: '',
        });

        mainCanvas.unsetModals('newCanvas');
    });

    return (
        <div className={`modal${currentModal && typesToOpen.includes(currentModal.type) ? ' is-active' : ''}`}>
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
                <footer className="modal-card-foot is-justify-content-space-between">
                    <SimpleControl {...{
                        cssClass: 'button is-success',
                        ariaLabel: 'Affirmative answer',
                        callback: yesHandler,
                        text: 'Yes',
                    }}
                    />
                    <SimpleControl {...{
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
});

export default SaveToGalleryPrompt;
