import { FC, useContext } from 'react';
import { observer } from 'mobx-react';
import AppContext from 'aux/AppContext';
import { makeFirstUppercase } from 'libs/lib';

interface Props {
    type: string;
}

const SimpleColorPicker: FC<Props> = observer(({
    type,
}) => {
    const { mainCanvas } = useContext(AppContext);
    const { spec: { color } } = mainCanvas.getActiveTool;
    return (
        <div>
            <label className="label" htmlFor="toolColor">{`${makeFirstUppercase(type)} color picker`}</label>
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
