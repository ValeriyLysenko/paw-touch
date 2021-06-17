import { FC } from 'react';

interface Props extends SimpleModalSpec {}

const SimpleModal: FC<Props> = ({
    children,
}) => {
    console.log('Simple modal');
    return (
        <div className="modal">
            <div className="modal-background" />
            <div className="modal-content">
                {children}
            </div>
            <button className="modal-close is-large" aria-label="close" />
        </div>
    );
};

export default SimpleModal;
