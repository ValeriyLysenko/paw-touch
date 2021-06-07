import {
    FC, useContext, MouseEvent,
} from 'react';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import LayoutContext from 'aux/LayoutContext';
import routes from 'routes';
import NavMenuSection from './NavMenuSection';

interface Props {}

const NavbarStart: FC<Props> = observer(() => {
    const {
        canvas,
        layout,
        tools,
    } = routes;
    const { canvasRef } = useContext(LayoutContext);
    const { mainCanvas } = useContext(AppContext);
    const { type: active } = mainCanvas.getActiveTool;
    const clickToolsHandler = (e: MouseEvent) => {
        e.stopPropagation();
        const target = e.currentTarget as HTMLDivElement;
        const type = target.dataset?.type || '';

        if (type === active) return;

        mainCanvas.setActiveToolType(type);
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
    return (
        <div className="navbar-start">
            <NavMenuSection routes={canvas} handlers={{ clearCanvas: clickClearCanvasHandler }} />
            <NavMenuSection routes={layout} />
            <NavMenuSection handlers={{ tools: clickToolsHandler }} routes={tools} />
        </div>
    );
});

export default NavbarStart;
