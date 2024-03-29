import {
    FC, useContext, MouseEvent,
} from 'react';
import { action } from 'mobx';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import LayoutContext from 'aux/LayoutContext';
import { zoomOnReset } from 'libs/canvasLib';

interface Props {}

const SimpleZoomInfo: FC<Props> = observer(() => {
    const { canvasRef } = useContext(LayoutContext);
    const { mainCanvas } = useContext(AppContext);
    const scale = mainCanvas.getScale;
    const { currentScale } = scale;
    const history = mainCanvas.getHistory;
    const historySpec = mainCanvas.getHistorySpec;
    const clickHandler = action('resetCanvasAction', (e: MouseEvent) => {
        e.stopPropagation();

        const { current: canvasEl } = canvasRef;
        if (!canvasEl) return;

        const ctx = canvasEl.getContext('2d');
        if (!ctx) return;

        mainCanvas.resetScale();

        zoomOnReset(ctx, {
            data: history,
            spec: historySpec,
        });
    });

    return (
        <div className="pt-tool-settings-block-line">
            <h4>Zoom size</h4>
            <span className="tag is-link">{`${(currentScale * 100).toFixed(0)} %`}</span>
            <button
                disabled={currentScale === 1}
                aria-label="Reset zoom"
                className="button is-link is-small"
                onClick={clickHandler}
            >
                Reset
            </button>
        </div>
    );
});

export default SimpleZoomInfo;
