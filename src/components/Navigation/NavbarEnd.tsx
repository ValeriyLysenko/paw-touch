import { FC, MouseEvent, useContext } from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import AppContext from 'aux/AppContext';
import ModalPortal from 'atomicComponents/Modal/ModalPortal';
import BasicModal from 'atomicComponents/Modal/BasicModal';
import SimpleControl from 'atomicComponents/Control/SimpleControl';
import { uniOnOpenHandler } from 'libs/lib';

interface Props {}

const NavbarEnd: FC<Props> = observer(() => {
    const { mainCanvas } = useContext(AppContext);
    const modals = mainCanvas.getModals;
    const {
        type: settingsType = '',
    } = modals.settings || {};
    const closeHandler = action('closePopupSettingsAction', (e: MouseEvent) => {
        e.stopPropagation();
        mainCanvas.unsetModals('settings');

    });
    const openHandler = action('openPopupSettingsAction', (e: MouseEvent) => {
        e.stopPropagation();
        uniOnOpenHandler(mainCanvas, 'settings', {
            type: 'settings',
            parent: '',
            child: '',
        });
    });

    return (
        <div className="navbar-end">
            <div className="navbar-item">
                <div className="buttons">
                    <Link to="/gallery" className="button is-link">
                        Gallery
                    </Link>
                    <SimpleControl {...{
                        cssClass: 'button is-warning',
                        ariaLabel: 'Settings',
                        callback: openHandler,
                        text: 'Settings',
                    }}
                    />
                </div>
            </div>
            {
                settingsType ? (
                    <ModalPortal>
                        <BasicModal
                            title="Warning"
                            content="This part of the application is currently under development."
                            closeHandler={closeHandler}
                            spec={{ type: 'settings', name: 'settings' }}
                        />
                    </ModalPortal>
                ) : null
            }
        </div>
    );
});

export default NavbarEnd;
