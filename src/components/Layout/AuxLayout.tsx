import {
    FC,
    useContext,
    useRef,
} from 'react';
import ToolSettings from 'components/Tools/ToolSettings';
import AppContext from 'aux/AppContext';

interface Props {
    spec: {
        type: string,
    };
}

const AuxLayout: FC<Props> = ({
    spec,
}) => {
    const {
        mainCanvas,
        auxCanvas,
    } = useContext(AppContext);
    const { type } = spec;
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const auxCanvasRef = useRef<HTMLCanvasElement | null>(null);

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
};

export default AuxLayout;
