import {
    FC, MouseEventHandler,
} from 'react';

interface Props {
    callback?: MouseEventHandler<HTMLButtonElement>,
    text: string;
    role?: string;
    ariaLabel: string;
    cssClass?: string;
    type?: 'submit' | 'reset' | 'button';
    dataType?: string;
    disabled?: boolean;
}

interface BtnProps {
    onClick?: MouseEventHandler<HTMLButtonElement>,
    role?: string;
    'aria-label': string;
    className?: string;
    type?: 'submit' | 'reset' | 'button';
    'data-type'?: string;
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
}) => {
    const btnProps: BtnProps = {
        onClick: callback || ((e) => console.log(e)),
        'aria-label': ariaLabel || 'Default text',
        className: `button ${cssClass}`,
        type: type || 'button',
    };
    if (role) btnProps.role = role;
    if (dataType) btnProps['data-type'] = dataType;
    if (disabled) btnProps.disabled = disabled;
    return (
        <button {...btnProps}>
            {text || 'Default text'}
        </button>
    );
};

export default SimpleControl;
