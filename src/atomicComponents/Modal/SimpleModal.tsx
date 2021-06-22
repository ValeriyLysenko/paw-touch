import { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import SimpleControl from 'atomicComponents/Control/SimpleControl';

interface Props {
    content: string;
    closeHandler: (e: React.MouseEvent) => void;
    spec: {
        type: string;
        name: string;
    }
}

const SimpleModal: FC<Props> = observer(({
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
            <div className="modal-content pt-helper-width-auto">
                {content}
            </div>
            <SimpleControl {...{
                cssClass: 'modal-close is-large',
                ariaLabel: 'Close modal',
                callback: closeHandler,
                text: '',
            }}
            />
        </div>
    );
});

export default SimpleModal;
