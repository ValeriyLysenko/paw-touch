import { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';

interface Props {}

const SimpleColorPicker: FC<Props> = observer(() => {
    const { mainCanvas } = useContext(AppContext);
    const { spec: { color } } = mainCanvas.getActiveTool;
    console.log('===SimpleColorPicker===', color);
    return (
        <div>
            <label className="label" htmlFor="toolColor">Color picker</label>
            <input
                id="toolColor"
                name="toolColor"
                className="input is-info"
                type="color"
                value={color}
                onChange={(e) => {
                    e.stopPropagation();
                    mainCanvas.setActiveToolColor(e.target.value);
                }}
            />
        </div>
    );
});

export default SimpleColorPicker;
