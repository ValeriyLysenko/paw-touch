import {
    FC, useContext, MouseEvent,
} from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import LayoutContext from 'aux/LayoutContext';
import SimpleControl from 'atomicComponents/Control/SimpleControl';
import { goThroughHistory } from 'libs/canvasLib';

interface Props {}

const StepControls: FC<Props> = observer(() => {
    const { mainCanvas } = useContext(AppContext);
    const { canvasRef } = useContext(LayoutContext);
    const history = mainCanvas.getHistory;
    const { position } = mainCanvas.getHistorySpec;
    const onClick = action('goThroughHistoryAction', (e: MouseEvent): void => {
        e.stopPropagation();
        const target = e.target as HTMLButtonElement;
        const { type } = target.dataset;
        const { current: canvas } = canvasRef;

        if (!type) return;
        if (!canvas) return;

        goThroughHistory(canvas, type, {
            position,
            history,
        });

        console.log('AFTER REDAW');
    });

    return (
        <div className="columns">
            <div className="column is-narrow">
                <SimpleControl {...{
                    cssClass: 'button is-warning is-outlined',
                    ariaLabel: 'Previous',
                    callback: onClick,
                    text: 'Previous step',
                    dataType: 'prev',
                    disabled: position === history.length,
                }}
                />
            </div>
            <div className="column">&nbsp;</div>
            <div className="column is-narrow">
                <SimpleControl {...{
                    cssClass: 'button is-warning is-outlined',
                    ariaLabel: 'Next',
                    callback: onClick,
                    text: 'Next step',
                    dataType: 'next',
                    disabled: position === 0,
                }}
                />
            </div>
        </div>
    );
});

export default StepControls;
