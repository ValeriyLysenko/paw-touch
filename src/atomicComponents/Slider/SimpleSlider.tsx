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
        <label className="label" htmlFor="toolSize">
            {`${makeFirstUppercase(type)} size`}
            <input
                ref={sliderRef}
                id="toolSize"
                name="toolSize"
                className="slider has-output is-fullwidth is-info"
                step={step}
                min={min}
                max={max}
                value={value}
                type="range"
                onChange={(e) => {
                    e.stopPropagation();
                    mainCanvas.setActiveToolSize(+e.target.value);
                }}
            />
            <output ref={outputRef} htmlFor="toolSize">{value}</output>
        </label>
    );
};

export default SimpleSlider;
