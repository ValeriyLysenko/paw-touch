import { FC, useContext, useRef } from 'react';
import { makeFirstUppercase } from 'libs/lib';
import AppContext from 'aux/AppContext';

interface Props {
    type: string;
    step: number;
    min: number;
    max: number;
    value: number;
}

const SimpleSlider: FC<Props> = ({
    type,
    step,
    min,
    max,
    value,
}) => {
    const { mainCanvas } = useContext(AppContext);
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
                    if (type === 'eraser') mainCanvas.setActiveToolEraserRadius(+e.target.value);
                    else mainCanvas.setActiveToolSize(+e.target.value);
                }}
            />
            <output ref={outputRef} htmlFor="toolSize">{value}</output>
        </label>
    );
};

export default SimpleSlider;
