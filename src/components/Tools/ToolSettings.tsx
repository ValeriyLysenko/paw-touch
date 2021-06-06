import { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import SimpleSlider from 'atomicComponents/Slider/SimpleSlider';
import SimpleColorPicker from 'atomicComponents/ColorPicker/SimpleColorPicker';
import ZoomInfo from 'atomicComponents/ZoomInfo';

interface Props {}

const ToolSettings: FC<Props> = observer(() => {
    const { mainCanvas } = useContext(AppContext);
    const {
        type, spec: {
            size,
        },
    } = mainCanvas.getActiveTool;
    const sliderShowArr: string[] = ['pencil', 'brush', 'eraser'];
    const colorShowArr: string[] = ['pencil', 'brush'];
    const sliderSpec = {
        type,
        step: 1,
        min: 0,
        max: 100,
        value: size,
    };
    const colorPickerSpec = {
        type,
    };

    return (
        <div className="pt-tool-settings-block">
            <ZoomInfo />
            {
                sliderShowArr.includes(type) && <SimpleSlider {...sliderSpec} />
            }
            {
                colorShowArr.includes(type) && <SimpleColorPicker {...colorPickerSpec} />
            }
        </div>
    );
});

export default ToolSettings;
