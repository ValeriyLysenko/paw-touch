import {
    FC, useContext,
} from 'react';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import { zoomer } from 'libs/canvasLib';

interface Props {
    scale: ScaleToolObject;
}

const ZoomInfo: FC<Props> = observer(({
    scale,
}) => {
    const { mainCanvas } = useContext(AppContext);
    const { currentScale } = scale;
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
                    mainCanvas.resetScale();
                    /* const mainCanvasEl = document.getElementById('pt-main-canvas') as HTMLCanvasElement;
                    const ctx = mainCanvasEl.getContext('2d');
                    if (!ctx) return;
                    // const activeTool = mainCanvas.getActiveTool;
                    // zoomer(ctx, activeTool.scale, {
                    zoomer(ctx, scale, {
                        isReset: true,
                    }); */
                    console.log('AFTER RESET');
                }}
            >
                Reset
            </button>
        </div>
    );
});

export default ZoomInfo;
