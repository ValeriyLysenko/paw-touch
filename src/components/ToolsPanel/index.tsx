import {
    FC,
    MouseEvent,
    useContext,
} from 'react';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import LayoutContext from 'aux/LayoutContext';
import dragComponent from 'hocs/dragComponent';
import toolsPanelConfig from './toolsPanelConfig';

interface Props {}

const ToolsPanel: FC<Props> = observer(() => {
    console.log('%cToolsPanel', 'color: olive;');
    const { mainCanvas } = useContext(AppContext);
    const { canvasRef } = useContext(LayoutContext);
    const { type: active } = mainCanvas.getActiveTool;
    const clickHandler = (e: MouseEvent) => {
        e.stopPropagation();
        const target = e.currentTarget as HTMLDivElement;
        const type = target.dataset?.type || '';
        const { current: canvasEl } = canvasRef;

        if (type === active) return;

        if (!canvasEl) return;
        const ctx = canvasEl.getContext('2d');
        if (!ctx) return;

        let canvasCache = null;
        // Cache canvas
        if (type === 'zoom') {
            canvasCache = ctx && ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
        }
        mainCanvas.setActiveToolType(type, canvasCache);
    };
    const items = Object.values(toolsPanelConfig);

    return (
        <div className="pt-tools-panel">

            <div className="pt-drag-plate">
                <div />
                <div />
                <div />
            </div>
            {
                items.map((item) => (
                    <div
                        className={`pt-tools-panel-plate${active === item.type ? ' pt-tools-tab-hover' : ''}`}
                        onClick={clickHandler}
                        aria-label={item.ariaLabel}
                        role="presentation"
                        data-type={item.type}
                        title={item.title}
                        key={item.id}
                    >
                        <a>
                            <i className={item.linkClassName} />
                        </a>
                    </div>
                ))
            }
            <div className="pt-drag-plate">
                <div />
                <div />
                <div />
            </div>
        </div>
    );

});

export default dragComponent(ToolsPanel, {
    dragHandle: 'pt-drag-plate',
});
