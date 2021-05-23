import { FC, useEffect, useRef } from 'react';
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

const SimpleSliderWithMovingThumb: FC<Props> = ({
    mainCanvas,
    type,
    step,
    min,
    max,
    value,
}) => {
    const sliderRef = useRef<HTMLInputElement>(null);
    const outputRef = useRef<HTMLOutputElement>(null);
    const getTagPos = (
        slider: HTMLInputElement,
        spec: {
            max: number,
            value: number,
            sliderThumbCorrection: number,
        },
    ): number => {
        const styles = window.getComputedStyle(slider, null);
        const sliderWidth = parseInt(styles.getPropertyValue('width'), 10);
        const newPoint = spec.value / (spec.max + spec.sliderThumbCorrection);

        return sliderWidth * newPoint;
    };

    useEffect(() => {
        const { current: slider } = sliderRef;
        const { current: output } = outputRef;

        if (!output || !slider) return;

        const position = getTagPos(slider, {
            max,
            value,
            sliderThumbCorrection: 4, // Depends on the shape and size of thumb in the input[type="range"]
        });

        output.style.left = `${position - 30}px`;
    }, [value, max]);

    return (
        <div>
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

export default SimpleSliderWithMovingThumb;
