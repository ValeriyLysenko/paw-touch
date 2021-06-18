import {
    FC, useCallback,
} from 'react';
import {
    useHistory,
} from 'react-router-dom';
import SimpleControl from 'atomicComponents/Control/SimpleControl';

interface Props {}

const GalleryControls: FC<Props> = () => {
    const history = useHistory();
    const onGoBack = useCallback((e) => {
        console.log(e.target.textContent);
        history.goBack();
    }, [history]);

    return (
        <div className="columns">
            <div className="column is-narrow">
                <SimpleControl {...{
                    cssClass: 'button is-warning is-outlined',
                    ariaLabel: 'Go back',
                    callback: onGoBack,
                    text: 'Go back',
                }}
                />
            </div>
            <div className="column">&nbsp;</div>
            <div className="column is-narrow">
                <SimpleControl {...{
                    cssClass: 'button is-danger',
                    ariaLabel: 'Delete gallery items',
                    callback: onGoBack,
                    text: 'Delete',
                }}
                />
            </div>
        </div>
    );
};

export default GalleryControls;
