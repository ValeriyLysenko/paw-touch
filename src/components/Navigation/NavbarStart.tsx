import {
    FC, useContext, MouseEvent,
} from 'react';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import LayoutContext from 'aux/LayoutContext';
import routes from 'routes';
import { zoomOnReset } from 'libs/canvasLib';
import NavMenuSection from './NavMenuSection';

interface Props {}

const NavbarStart: FC<Props> = observer(() => {
    const {
        canvas,
        layout,
        tools,
    } = routes;
    const { canvasRef } = useContext(LayoutContext);
    const { mainCanvas, canvasStoreDefaults } = useContext(AppContext);
    const { historyDefaults } = canvasStoreDefaults;
    const history = mainCanvas.getHistory;
    const historySpec = mainCanvas.getHistorySpec;
    const { type: active } = mainCanvas.getActiveTool;
    const clickNewCanvasHandler = (e: MouseEvent) => {
        e.stopPropagation();
        const { current: canvasEl } = canvasRef;
        if (!canvasEl) return;
        const { width, height } = canvasEl;
        const ctx = canvasEl.getContext('2d');
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
        const { current: canvasEl } = canvasRef;
        if (!canvasEl) return;
        const { width, height } = canvasEl;
        const ctx = canvasEl.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, width, height);
    };
    const clickToolsHandler = (e: MouseEvent) => {
        e.stopPropagation();
        const target = e.currentTarget as HTMLDivElement;
        const type = target.dataset?.type || '';

        if (type === active) return;

        mainCanvas.setActiveToolType(type);
    };
    return (
        <div className="navbar-start">
            <NavMenuSection
                routes={canvas}
                handlers={{
                    newCanvas: clickNewCanvasHandler,
                    clearCanvas: clickClearCanvasHandler,
                }}
            />
            <NavMenuSection routes={layout} />
            <NavMenuSection handlers={{ tools: clickToolsHandler }} routes={tools} />
        </div>
    );
});

export default NavbarStart;
