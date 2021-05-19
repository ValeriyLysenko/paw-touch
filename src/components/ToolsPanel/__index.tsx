import {
    FC,
    useCallback,
    useState,
} from 'react';
import dragComponent from 'hocs/dragComponent';
import ToolsPanelBrush from 'atomicComponents/SVG/ToolsPanelBrush';
import ToolsPanelPencil from 'atomicComponents/SVG/ToolsPanelPencil';
import ToolsPanelPaint from 'atomicComponents/SVG/ToolsPanelPaint';
import ToolsPanelEraser from 'atomicComponents/SVG/ToolsPanelEraser';

interface Props {}

const ToolsPanel: FC = (props: Props) => {
    console.log('%TcoolsPanel', 'color: olive;');
    const [active, setActive] = useState('');
    const handleToolsClick = useCallback((e) => {
        const target = e.currentTarget as HTMLDivElement;
        const type = target.dataset?.type || '';
        setActive(type);
    }, []);

    console.log('active', active);

    return (
        <div className="pt-tools-panel">

            <div className="pt-drag-plate">
                <div />
                <div />
                <div />
            </div>

            <div
                className={`pt-tools-panel-plate${active === 'pencil' ? ' pt-tools-tab-hover' : ''}`}
                onClick={handleToolsClick}
                aria-label="Pencil tool"
                role="presentation"
                data-type="pencil"
            >
                <a>
                    <i className="fas fa-paint-brush" />
                </a>
            </div>
            <div className="pt-tools-panel-plate">
                <a>
                    <ToolsPanelBrush />
                </a>
            </div>
            <div className="pt-tools-panel-plate">
                <a>
                    <i className="fas fa-pencil-alt" />
                </a>
            </div>
            <div className="pt-tools-panel-plate">
                <a>
                    <ToolsPanelPencil />
                </a>
            </div>
            <div className="pt-tools-panel-plate">
                <a>
                    <i className="fas fa-fill-drip" />
                </a>
            </div>
            <div className="pt-tools-panel-plate">
                <a>
                    <ToolsPanelPaint />
                </a>
            </div>
            <div className="pt-tools-panel-plate">
                <a>
                    <i className="fas fa-eraser" />
                </a>
            </div>
            <div className="pt-tools-panel-plate">
                <a>
                    <ToolsPanelEraser />
                </a>
            </div>

            <div className="pt-drag-plate">
                <div />
                <div />
                <div />
            </div>
        </div>
    );

};

export default dragComponent(ToolsPanel, {
    dragHandle: 'pt-drag-plate',
});
