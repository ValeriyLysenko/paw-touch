import {
    FC,
    useContext,
    useRef,
} from 'react';
import { observer } from 'mobx-react-lite';
import ToolSettings from 'components/Tools/ToolSettings';
import AppContext from 'aux/AppContext';

interface Props {
    spec: {
        type: string,
    };
}

const AuxLayout: FC<Props> = observer(({

    spec,
}) => {
    const {
        mainCanvas,
        auxCanvas,
    } = useContext(AppContext);
    const { type } = spec;
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const auxCanvasRef = useRef<HTMLCanvasElement | null>(null);
    console.log('%cBasicLayout', 'color: green;', mainCanvas);
    console.log('%cBasicLayout', 'color: blue;', auxCanvas);

    if (type === 'vertical') {
        return (
            <div className="pt-drawing-block">
                <div className="pt-canvas-container pt-vertical-split">
                    <canvas ref={canvasRef} />
                </div>
                <div className="pt-drawing-block-gap" />
                <div className="pt-canvas-container pt-vertical-split">
                    <canvas ref={auxCanvasRef} />
                </div>
                <div className="pt-drawing-block-gap" />
                <ToolSettings />
            </div>
        );
    }

    return (
        <div className="pt-drawing-block">
            <div className="pt-drawing-canvas-block">
                <div className="pt-canvas-container pt-horizontal-split">
                    <canvas ref={canvasRef} />
                </div>
                <div className="pt-drawing-block-gap" />
                <div className="pt-canvas-container pt-horizontal-split">
                    <canvas ref={auxCanvasRef} />
                </div>
            </div>
            <div className="pt-drawing-block-gap" />
            <ToolSettings />
        </div>

    );
});

export default AuxLayout;
