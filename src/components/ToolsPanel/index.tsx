import {
    FC,
    MouseEvent,
    useContext,
} from 'react';
import { useRouteMatch } from 'react-router-dom';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import dragComponent from 'hocs/dragComponent';
import toolsPanelConfig from './toolsPanelConfig';

interface Props {}

const ToolsPanel: FC<Props> = observer(() => {
    const { mainCanvas } = useContext(AppContext);
    const { type: active } = mainCanvas.getActiveTool;
    const isGalleryRoute = useRouteMatch('/gallery');
    const clickHandler = (e: MouseEvent) => {
        e.stopPropagation();
        const target = e.currentTarget as HTMLDivElement;
        const type = target.dataset?.type || '';

        if (type === active) return;

        mainCanvas.setActiveToolType(type);
    };
    const items = Object.values(toolsPanelConfig);

    return (
        <div className={`pt-tools-panel${isGalleryRoute ? ' is-hidden' : ''}`}>
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
