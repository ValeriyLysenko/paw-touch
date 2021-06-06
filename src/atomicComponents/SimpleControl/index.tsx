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
    dataType?: string;
    disabled?: boolean;
}

const SimpleControl: FC<Props> = ({
    callback,
    text,
    role,
    ariaLabel,
    type,
    dataType,
    cssClass,
    disabled,
}) => (
    <button
        type={type || 'button'}
        data-type={dataType || ''}
        className={`button ${cssClass}`}
        role={role || 'Default text'}
        aria-label={ariaLabel || 'Default text'}
        onClick={callback || ((e) => console.log(e))}
        {...(disabled && { disabled: true })}
    >
        {text || 'Default text'}
    </button>
);

export default SimpleControl;
