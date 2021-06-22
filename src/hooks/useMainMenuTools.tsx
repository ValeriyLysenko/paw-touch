import {
    useContext, MouseEvent,
} from 'react';
import { action } from 'mobx';
import AppContext from 'aux/AppContext';

const useMainMenuTools = (): HandlerFunc[] => {
    const { mainCanvas } = useContext(AppContext);
    const { type: active } = mainCanvas.getActiveTool;

    const clickToolsHandler = action('setActiveToolTypeViaMainMenuAction', (e: MouseEvent) => {
        e.stopPropagation();
        const target = e.currentTarget as HTMLDivElement;
        const type = target.dataset?.type || '';

        if (type === active) return;

        mainCanvas.setActiveToolType(type);
    });

    return [
        clickToolsHandler,
    ];
};

export default useMainMenuTools;
