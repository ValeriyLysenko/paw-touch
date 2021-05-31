import {
    FC,
} from 'react';
import { makeFirstUppercase } from 'libs/lib';

interface Props {
    type: string;
    value: number;
}

const ZoomInfo: FC<Props> = ({
    type,
    value,
}) => (
    <h4 className="pt-tool-settings-block-subtitle">
        {`${makeFirstUppercase(type)} size`}
            &nbsp;&nbsp;
        <span className="tag is-info">{`${(value * 100).toFixed(0)} %`}</span>
    </h4>
);

export default ZoomInfo;
