import {
    FC,
} from 'react';
import { observer } from 'mobx-react';
import CanvasStore from 'stores/CanvasStore';

interface Props {
    mainCanvas: CanvasStore;
    auxCanvas: CanvasStore;
    spec: {
        id: string,
        cssClass: string,
    };
}

const AuxLayout: FC<Props> = ({
    mainCanvas,
    auxCanvas,
    spec,
}) => {
    console.log('%cBasicLayout', 'color: green;', mainCanvas);
    console.log('%cBasicLayout', 'color: blue;', auxCanvas);
    const { id, cssClass } = spec;
    return (
        <div id={id} className={`pt-canvas-container-split ${cssClass}`}>
            <div><canvas /></div>
            <div />
            <div><canvas /></div>
        </div>
    );

};

export default observer(AuxLayout);
