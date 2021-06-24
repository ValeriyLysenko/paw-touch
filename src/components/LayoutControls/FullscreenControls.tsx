import {
    FC,
} from 'react';
import {
    useHistory,
} from 'react-router-dom';
import SimpleControl from 'atomicComponents/Control/SimpleControl';

interface Props {}

const FullscreenControls: FC<Props> = () => {
    const history = useHistory();
    const goBackHandler = () => history.goBack();

    return (
        <div className="columns">
            <div className="column is-narrow">
                <SimpleControl {...{
                    cssClass: 'button is-warning is-outlined',
                    ariaLabel: 'Go back',
                    callback: goBackHandler,
                    text: 'Go back',
                }}
                />
            </div>
            <div className="column">&nbsp;</div>
            <div className="column is-narrow" />
        </div>
    );
};

export default FullscreenControls;
