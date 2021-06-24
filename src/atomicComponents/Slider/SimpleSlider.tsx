import { FC, useContext } from 'react';
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

    return (
        <label className="label" htmlFor="toolSize">
            {`${makeFirstUppercase(type)} size`}
            <input
                id="toolSize"
                name="toolSize"
                className="slider has-output is-fullwidth is-link"
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
            <output htmlFor="toolSize">{value}</output>
        </label>
    );
};

export default SimpleSlider;
