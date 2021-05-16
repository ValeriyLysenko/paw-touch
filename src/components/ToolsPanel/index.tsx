import {
    FC,
    useCallback,
    useState,
} from 'react';
import dragComponent from 'hocs/dragComponent';
import toolsPanelConfig from './toolsPanelConfig';

interface Props {}

const ToolsPanel: FC = (props: Props) => {
    console.log('%ToolsPanel', 'color: olive;');
    const [active, setActive] = useState('');
    const handleToolsClick = useCallback((e) => {
        const target = e.currentTarget as HTMLDivElement;
        const type = target.dataset?.type || '';
        setActive(type);
    }, []);
    const items = Object.values(toolsPanelConfig);

    console.log('active', active);

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
                        onClick={handleToolsClick}
                        aria-label={item.ariaLabel}
                        role="presentation"
                        data-type={item.type}
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

};

export default dragComponent(ToolsPanel, {
    dragHandle: 'pt-drag-plate',
});
