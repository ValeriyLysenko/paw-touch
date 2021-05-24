import { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import SimpleSlider from 'atomicComponents/Slider/SimpleSlider';
import SimpleColorPicker from 'atomicComponents/ColorPicker/SimpleColorPicker';

interface Props {}

const ToolSettings: FC<Props> = observer(() => {
    const { mainCanvas } = useContext(AppContext);
    const { type, spec } = mainCanvas.getActiveTool;
    const sliderShowArr: string[] = ['pencil', 'brush'];
    const sliderSpec = {
        type,
        step: 1,
        min: 0,
        max: 100,
        value: spec.size,
    };
    return (
        <div className={`pt-tool-settings-block ${!sliderShowArr.includes(type) ? 'is-hidden' : ''}`}>
            <SimpleSlider {...sliderSpec} />
            <SimpleColorPicker />
        </div>
    );
});

export default ToolSettings;
