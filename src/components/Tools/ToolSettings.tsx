import { FC } from 'react';
import { observer } from 'mobx-react';
import { mainCanvas } from 'aux/init';
import SimpleSlider from 'atomicComponents/Slider/SimpleSlider';

interface Props {}

const ToolSettings: FC<Props> = observer(() => {
    const { type, spec } = mainCanvas.getActiveTool;
    const sliderShowArr: string[] = ['pencil', 'brush'];
    const sliderSpec = {
        mainCanvas,
        type,
        step: 1,
        min: 0,
        max: 100,
        value: spec.size,
    };
    return (
        <div className={`pt-tool-settings-block ${!sliderShowArr.includes(type) ? 'is-hidden' : ''}`}>
            <SimpleSlider {...sliderSpec} />
        </div>
    );
});

export default ToolSettings;
