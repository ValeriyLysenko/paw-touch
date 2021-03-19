import {
    FC, useCallback,
} from 'react';
import SimpleControl from 'atomicComponents/SimpleControl';

interface Props {}

const LayoutControls: FC<Props> = () => {
    const onPreviousStep = useCallback((e) => {
        console.log(e.target.textContent);
    }, []);
    const onNextStep = useCallback((e) => {
        console.log(e.target.textContent);
    }, []);

    return (
        <div className="columns is-fullwidth">
            <div className="column is-narrow">
                <SimpleControl {...{
                    cssClass: 'is-warning is-outlined',
                    ariaLabel: 'Previous',
                    callback: onPreviousStep,
                    text: 'Previous step',
                }}
                />
            </div>
            <div className="column">&nbsp;</div>
            <div className="column is-narrow">
                <SimpleControl {...{
                    cssClass: 'is-warning is-outlined',
                    ariaLabel: 'Next',
                    callback: onNextStep,
                    text: 'Next step',
                }}
                />
            </div>
        </div>
    );
};

export default LayoutControls;
