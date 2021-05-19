import { FC } from 'react';
import { makeFirstUppercase } from 'libs/lib';
import CanvasStore from 'stores/CanvasStore';

interface Props {
    mainCanvas: CanvasStore;
    type: string;
    step: number;
    min: number;
    max: number;
    value: number;
}

const SimpleSlider: FC<Props> = ({
    mainCanvas,
    type,
    step,
    min,
    max,
    value,
}) => (
    <div>
        <p className="subtitle is-5">
            {makeFirstUppercase(type)}
            {' '}
            size
        </p>
        <div>
            <input
                className="slider is-fullwidth is-info"
                step={step}
                min={min}
                max={max}
                value={value}
                type="range"
                onChange={(e) => {
                    e.stopPropagation();
                    mainCanvas.setActiveToolSpec({ size: +e.target.value });
                }}
            />
        </div>
    </div>
);

export default SimpleSlider;
