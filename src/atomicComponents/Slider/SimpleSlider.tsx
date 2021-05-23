import { FC, useRef } from 'react';
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
}) => {
    const sliderRef = useRef<HTMLInputElement>(null);
    const outputRef = useRef<HTMLOutputElement>(null);

    return (
        <div className="block">
            <p className="subtitle is-5">
                {makeFirstUppercase(type)}
                {' '}
                size
            </p>
            <div className="pt-helper-pos-rel">
                <input
                    ref={sliderRef}
                    id="sliderWithValue"
                    className="slider has-output is-fullwidth is-info"
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
                <output ref={outputRef} htmlFor="sliderWithValue">{value}</output>
            </div>
        </div>
    );
};

export default SimpleSlider;
