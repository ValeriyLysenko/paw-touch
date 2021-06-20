import {
    useContext, MouseEvent,
} from 'react';
import { action } from 'mobx';
import AppContext from 'aux/AppContext';
import LayoutContext from 'aux/LayoutContext';
import { uniOnOpenHandler } from 'libs/lib';
import { zoomOnReset, setCanvasBg } from 'libs/canvasLib';

const useMainMenuCanvas = (): HandlerFunc[] => {
    const { canvasRef } = useContext(LayoutContext);
    const { mainCanvas, canvasStoreDefaults } = useContext(AppContext);
    const clickNewCanvasHandler = action('openPopupNewCanvasAction', (e: MouseEvent) => {
        e.stopPropagation();
        uniOnOpenHandler(mainCanvas, {
            type: 'new-canvas',
            parent: '',
            child: 'save-to-gallery',
        });
    });

    const clickClearCanvasHandler = (e: MouseEvent) => {
        e.stopPropagation();
        const { current: canvas } = canvasRef;
        if (!canvas) return;
        const { width, height } = canvas;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.save();
        ctx.clearRect(0, 0, width, height);
        // Set default background color
        setCanvasBg(ctx);
        ctx.restore();
    };

    const clickDownloadCanvasHandler = (e: MouseEvent) => {
        e.stopPropagation();
        const { current: canvas } = canvasRef;
        if (!canvas) return;
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png', 1);
        link.download = 'Your masterpiece.png';
        link.click();
    };

    const clickSaveToGalleryCanvasHandler = action('openPopupSaveToGalleryAction', (e: MouseEvent) => {
        e.stopPropagation();
        uniOnOpenHandler(mainCanvas, {
            type: 'save-to-gallery',
            parent: '',
            child: '',
        });
    });

    const resetCanvasToDefaults = action('resetCanvasToDefaultsAction', () => {
        const { historyDefaults } = canvasStoreDefaults;
        const history = mainCanvas.getHistory;
        const historySpec = mainCanvas.getHistorySpec;

        const { current: canvas } = canvasRef;
        if (!canvas) return;
        const { width, height } = canvas;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        mainCanvas.resetScale();
        zoomOnReset(ctx, {
            data: history,
            spec: historySpec,
        });

        ctx.save();
        ctx.clearRect(0, 0, width, height);
        // Set default background color
        setCanvasBg(ctx);
        ctx.restore();
        mainCanvas.setHistory(historyDefaults);
        mainCanvas.setHistorySpecPos(0);
    });

    return [
        clickNewCanvasHandler,
        clickClearCanvasHandler,
        clickDownloadCanvasHandler,
        clickSaveToGalleryCanvasHandler,
        resetCanvasToDefaults,
    ];
};

export default useMainMenuCanvas;
