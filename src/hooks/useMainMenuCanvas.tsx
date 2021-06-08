import {
    useContext, MouseEvent,
} from 'react';
import { runInAction } from 'mobx';
import AppContext from 'aux/AppContext';
import LayoutContext from 'aux/LayoutContext';
import { zoomOnReset } from 'libs/canvasLib';

const useMainMenuCanvas = (): HandlerFunc[] => {
    const { canvasRef } = useContext(LayoutContext);
    const { mainCanvas, canvasStoreDefaults } = useContext(AppContext);
    const { historyDefaults } = canvasStoreDefaults;
    const history = mainCanvas.getHistory;
    const historySpec = mainCanvas.getHistorySpec;
    const clickNewCanvasHandler = (e: MouseEvent) => {
        e.stopPropagation();
        const { current: canvas } = canvasRef;
        if (!canvas) return;
        const { width, height } = canvas;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        mainCanvas.resetScale();
        runInAction(() => {
            zoomOnReset(ctx, {
                data: history,
                spec: historySpec,
            });
        });
        ctx.clearRect(0, 0, width, height);
        mainCanvas.setHistory(historyDefaults);
        mainCanvas.setHistorySpecPos(0);
    };
    const clickClearCanvasHandler = (e: MouseEvent) => {
        e.stopPropagation();
        const { current: canvas } = canvasRef;
        if (!canvas) return;
        const { width, height } = canvas;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, width, height);
    };
    return [clickNewCanvasHandler, clickClearCanvasHandler];
};

export default useMainMenuCanvas;
