import {
    FC,
} from 'react';
import { observer } from 'mobx-react';
import CanvasStore from 'stores/CanvasStore';

interface Props {
    mainCanvas: CanvasStore;
}

const BasicLayout: FC<Props> = ({ mainCanvas }) => {
    console.log('%cBasicLayout', 'color: green;', mainCanvas);
    return (
        <div id="pt-canvas-container" className="pt-canvas-container"><canvas /></div>
    );

};

export default observer(BasicLayout);
