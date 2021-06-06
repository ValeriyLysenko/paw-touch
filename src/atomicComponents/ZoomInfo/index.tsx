import {
    FC, useContext, MouseEvent,
} from 'react';
import { runInAction } from 'mobx';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import LayoutContext from 'aux/LayoutContext';
import { zoomOnReset } from 'libs/canvasLib';

interface Props {}

const ZoomInfo: FC<Props> = observer(() => {
    const { canvasRef } = useContext(LayoutContext);
    const { mainCanvas } = useContext(AppContext);
    const { scale } = mainCanvas.getActiveTool;
    const { currentScale } = scale;
    const history = mainCanvas.getHistory;
    const historySpec = mainCanvas.getHistorySpec;
    const clickHandler = (e: MouseEvent) => {
        e.stopPropagation();
        console.log('BEFORE RESET');
        const { current: canvasEl } = canvasRef;
        if (!canvasEl) return;
        const ctx = canvasEl.getContext('2d');
        if (!ctx) return;
        mainCanvas.resetScale();
        runInAction(() => {
            zoomOnReset(ctx, {
                data: history,
                spec: historySpec,
            }, scale);
        });

        console.log('AFTER RESET');
    };
    return (
        <div className="pt-tool-settings-block-line">
            <h4>Zoom size</h4>
            <span className="tag is-info">{`${(currentScale * 100).toFixed(0)} %`}</span>
            <button
                disabled={currentScale === 1}
                aria-label="Reset zoom"
                className="button is-info is-small"
                onClick={clickHandler}
            >
                Reset
            </button>
        </div>
    );
});

export default ZoomInfo;
