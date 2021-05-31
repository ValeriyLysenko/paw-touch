import { FC, useContext } from 'react';
import { observer } from 'mobx-react-lite';
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
        scale: {
            currentScale,
        },
    } = mainCanvas.getActiveTool;
    const sliderShowArr: string[] = ['pencil', 'brush', 'eraser'];
    const colorShowArr: string[] = ['pencil', 'brush'];
    const zoomShowArr: string[] = ['zoom'];
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
    const zoomSpec = {
        type,
        value: currentScale,
    };
    return (
        <div className="pt-tool-settings-block">
            {
                sliderShowArr.includes(type) && <SimpleSlider {...sliderSpec} />
            }
            {
                colorShowArr.includes(type) && <SimpleColorPicker {...colorPickerSpec} />
            }
            {
                zoomShowArr.includes(type) && <ZoomInfo {...zoomSpec} />
            }
        </div>
    );
});

export default ToolSettings;
