import { FC } from 'react';

interface Props extends BasicModalSpec {}

const BasicModal: FC<Props> = ({
    title,
    controls,
    children,
}) => {
    console.log('Basic modal');
    return (
        <div className="modal">
            <div className="modal-background" />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{title}</p>
                    <button className="delete" aria-label="close" />
                </header>
                <section className="modal-card-body">
                    {children}
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-success">Save changes</button>
                    <button className="button">Cancel</button>
                </footer>
            </div>
        </div>
    );
};

export default BasicModal;
