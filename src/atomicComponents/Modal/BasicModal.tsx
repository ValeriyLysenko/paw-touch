import { FC } from 'react';
import { uniOnCloseHandler } from 'libs/lib';

interface Props extends BasicModalSpec {}

const BasicModal: FC<Props> = ({
    title,
    Controls,
    children,
}) => {
    console.log('Basic modal');
    return (
        <div
            className="modal"
            onSubmit={(e) => {
                e.stopPropagation();
                console.log(e);
                console.log(e.target);
            }}
        >
            <div className="modal-background" />
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">{title}</p>
                    <button
                        className="delete"
                        aria-label="Close modal"
                        onClick={uniOnCloseHandler}
                    />
                </header>
                <section className="modal-card-body">
                    {children}
                </section>
                <footer className="modal-card-foot">
                    <Controls />
                    {/* <button className="button is-success">Save changes</button>
                    <button className="button">Cancel</button> */}
                </footer>
            </div>
        </div>
    );
};

export default BasicModal;
