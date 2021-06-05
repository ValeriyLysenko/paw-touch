import {
    useContext, MouseEvent, forwardRef,
} from 'react';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import SimpleControl from 'atomicComponents/SimpleControl';
import { goThroughHistory } from 'libs/canvasLib';

interface Props {}

const StepControls = observer(forwardRef<HTMLCanvasElement, Props>((props, ref) => {
    const { mainCanvas } = useContext(AppContext);
    const history = mainCanvas.getHistory;
    const { position } = mainCanvas.getCanvasHistorySpec;
    const onClick = (e: MouseEvent): void => {
        e.stopPropagation();
        const target = e.target as HTMLButtonElement;
        const { type } = target.dataset;
        // @ts-ignore
        const { current: canvas } = ref;

        if (!type) return;
        if (!canvas) return;

        console.log('BEFORE REDRAW', target.dataset);

        goThroughHistory(canvas, type, {
            position,
            history,
        });
        console.log('AFTER REDAW');
    };

    console.log('%cposition', 'color: red', position);
    console.log('%chistory.length', 'color: red', position);

    return (
        <div className="columns is-fullwidth">
            <div className="column is-narrow">
                <SimpleControl {...{
                    cssClass: 'is-warning is-outlined',
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
                    cssClass: 'is-warning is-outlined',
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
}));

export default StepControls;
