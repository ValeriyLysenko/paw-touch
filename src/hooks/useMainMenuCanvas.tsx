import {
    useContext, MouseEvent,
} from 'react';
import { runInAction } from 'mobx';
import AppContext from 'aux/AppContext';
import LayoutContext from 'aux/LayoutContext';
import { sendBlobToServer } from 'libs/lib';
import { zoomOnReset, setCanvasBg } from 'libs/canvasLib';

const useMainMenuCanvas = (): HandlerFunc[] => {
    const { canvasRef } = useContext(LayoutContext);
    const { mainCanvas, canvasStoreDefaults } = useContext(AppContext);
    const { historyDefaults } = canvasStoreDefaults;
    const history = mainCanvas.getHistory;
    const historySpec = mainCanvas.getHistorySpec;
    const clickNewCanvasHandler = async (e: MouseEvent) => {
        e.stopPropagation();
        const { current: canvas } = canvasRef;
        if (!canvas) return;
        const { width, height } = canvas;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const response = await sendBlobToServer(canvas, {
            imageType: 'image/png',
            imageQuality: 1,
        });

        console.log('RESPONSE', response);

        mainCanvas.resetScale();
        runInAction(() => {
            zoomOnReset(ctx, {
                data: history,
                spec: historySpec,
            });
        });
        ctx.save();
        ctx.clearRect(0, 0, width, height);
        // Set default background color
        setCanvasBg(ctx);
        ctx.restore();
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

        ctx.save();
        ctx.clearRect(0, 0, width, height);
        // Set default background color
        setCanvasBg(ctx);
        ctx.restore();
    };
    return [clickNewCanvasHandler, clickClearCanvasHandler];
};

export default useMainMenuCanvas;

/* canvas.toBlob((blob) => {
            // const img = document.createElement('img');
            // const url = URL.createObjectURL(blob);

            // img.onload = () => {
            //     // No longer need to read the blob so it's revoked
            //     URL.revokeObjectURL(url);
            // };

            // img.src = url;
            // console.log(url);
            // document.body.appendChild(img);

        }, 'image/png', 1.0); */
