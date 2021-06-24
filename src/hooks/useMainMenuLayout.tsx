import {
    useContext, MouseEvent,
} from 'react';
import { action } from 'mobx';
import AppContext from 'aux/AppContext';
import { uniOnOpenHandler } from 'libs/lib';

const useMainMenuLayout = (): HandlerFunc[] => {
    const { mainCanvas } = useContext(AppContext);

    const closeUnderDevelopmentHandler = action('closePopupUnderDevelopmentAction', (e: MouseEvent) => {
        e.stopPropagation();
        mainCanvas.unsetModals('underDevelopment');
    });

    const openUnderDevelopmentHandler = action('openPopupUnderDevelopmentAction', (e: MouseEvent) => {
        e.stopPropagation();
        uniOnOpenHandler(mainCanvas, 'underDevelopment', {
            type: 'under-development',
            parent: '',
            child: '',
        });
    });

    return [
        closeUnderDevelopmentHandler,
        openUnderDevelopmentHandler,
    ];
};

export default useMainMenuLayout;
