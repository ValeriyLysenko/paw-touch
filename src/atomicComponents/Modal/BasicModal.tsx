import { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import SimpleControl from 'atomicComponents/Control/SimpleControl';

interface Props {
    title: string;
    content: string;
    closeHandler: (e: React.MouseEvent) => void;
    spec: {
        type: string;
        name: string;
    }
}

const BasicModal: FC<Props> = observer(({
    title,
    content,
    closeHandler,
    spec,
}) => {
    const { mainCanvas } = useContext(AppContext);
    const currentModal = mainCanvas.getModals[spec.name];
    const typesToOpen = [spec.type];
    return (
        <div className={`modal${currentModal && typesToOpen.includes(currentModal.type) ? ' is-active' : ''}`}>
            <div className="modal-background" />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{title}</p>
                    <button
                        className="delete"
                        aria-label="Close modal"
                        onClick={closeHandler}
                    />
                </header>
                <section className="modal-card-body">
                    {content}
                </section>
                <footer className="modal-card-foot is-justify-content-flex-end">
                    <SimpleControl {...{
                        cssClass: 'button is-warning',
                        ariaLabel: 'Close modal',
                        callback: closeHandler,
                        text: 'Close',
                    }}
                    />
                </footer>
            </div>
        </div>
    );
});

export default BasicModal;
