import {
    FC, MouseEventHandler,
} from 'react';

interface Props {
    callback: MouseEventHandler<HTMLButtonElement>,
    text: string;
    role?: string;
    ariaLabel: string;
    cssClass?: string;
    type?: 'submit' | 'reset' | 'button';
}

const SimpleControl: FC<Props> = ({
    callback,
    text,
    role,
    ariaLabel,
    type,
    cssClass,
}) => {
    console.log(ariaLabel);
    return (
        <button
            type={type || 'button'}
            className={`button ${cssClass}`}
            role={role || 'Default text'}
            aria-label={ariaLabel || 'Default text'}
            onClick={callback || ((e) => console.log(e))}
        >
            {text || 'Default text'}
        </button>
    );
};

export default SimpleControl;
