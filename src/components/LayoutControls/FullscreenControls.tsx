import {
    FC, useCallback,
} from 'react';
import {
    useHistory,
} from 'react-router-dom';
import SimpleControl from 'atomicComponents/Control/SimpleControl';

interface Props {}

const FullscreenControls: FC<Props> = () => {
    const history = useHistory();
    const onGoBack = useCallback((e) => {
        console.log(e.target.textContent);
        history.goBack();
    }, [history]);

    return (
        <div className="columns is-fullwidth">
            <div className="column is-narrow">
                <SimpleControl {...{
                    cssClass: 'is-warning is-outlined',
                    ariaLabel: 'Go back',
                    callback: onGoBack,
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
