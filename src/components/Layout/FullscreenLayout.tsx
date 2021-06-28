import {
    FC,
} from 'react';
import StepControls from 'components/LayoutControls/StepControls';
import FullscreenControls from 'components/LayoutControls/FullscreenControls';

interface Props {}

const FullscreenLayout: FC<Props> = () => (
    <div className="pt-on-top pt-on-top-canvas">
        <div className="pt-navbar pt-navbar-top">
            <FullscreenControls />
        </div>
        <div className="pt-canvas-container"><canvas /></div>
        <div className="pt-navbar pt-navbar-bottom">
            <StepControls />
        </div>
    </div>
);

export default FullscreenLayout;
