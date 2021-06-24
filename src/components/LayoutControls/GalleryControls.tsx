import {
    FC, useContext, MouseEvent,
} from 'react';
import {
    useHistory,
} from 'react-router-dom';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import SimpleControl from 'atomicComponents/Control/SimpleControl';
import ModalPortal from 'atomicComponents/Modal/ModalPortal';
import DeleteFromGalleryPrompt from 'components/Modals/DeleteFromGalleryPrompt';
import { uniOnOpenHandler } from 'libs/lib';

interface Props {}

const GalleryControls: FC<Props> = observer(() => {
    const { mainCanvas } = useContext(AppContext);
    const modals = mainCanvas.getModals;
    const {
        type: deleteFromGalleryType = '',
    } = modals.deleteFromGallery || {};
    const history = useHistory();
    const goBackHandler = () => history.goBack();

    const openHandler = action('openPopupDeleteFromGalleryPromptAction', (e: MouseEvent) => {
        e.stopPropagation();
        uniOnOpenHandler(mainCanvas, 'deleteFromGallery', {
            type: 'delete-from-gallery',
            parent: '',
            child: '',
        });
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
                    callback: openHandler,
                    text: 'Delete',
                }}
                />
            </div>
            {
                deleteFromGalleryType ? (
                    <ModalPortal>
                        <DeleteFromGalleryPrompt />
                    </ModalPortal>
                ) : null
            }
        </div>
    );
});

export default GalleryControls;
