import {
    FC, useContext,
} from 'react';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import LayoutContext from 'aux/LayoutContext';
import { zoomOnReset } from 'libs/canvasLib';

interface Props {}

const ZoomInfo: FC<Props> = observer(() => {
    const {
        canvasRef: {
            current: canvasEl,
        },
    } = useContext(LayoutContext);
    const { mainCanvas } = useContext(AppContext);
    const {
        scale: {
            currentScale,
        },
    } = mainCanvas.getActiveTool;
    const history = mainCanvas.getHistory;
    const historySpec = mainCanvas.getHistorySpec;
    return (
        <div className="pt-tool-settings-block-line">
            <h4>Zoom size</h4>
            <span className="tag is-info">{`${(currentScale * 100).toFixed(0)} %`}</span>
            <button
                disabled={currentScale === 1}
                aria-label="Reset zoom"
                className="button is-info is-small"
                onClick={() => {
                    console.log('BEFORE RESET');
                    if (!canvasEl) return;
                    const ctx = canvasEl.getContext('2d');
                    if (!ctx) return;
                    mainCanvas.resetScale();
                    zoomOnReset(ctx, {
                        data: history,
                        spec: historySpec,
                    });
                    console.log('AFTER RESET');
                }}
            >
                Reset
            </button>
        </div>
    );
});

export default ZoomInfo;