import { FC } from 'react';

interface Props {}

const Canvas: FC<Props> = () => {
    console.log('ccc');
    return (
        <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
                Canvas
            </a>

            <div className="navbar-dropdown">
                <a className="navbar-item">
                    New canvas
                </a>
                <a className="navbar-item">
                    Save
                </a>
                <a className="navbar-item">
                    Save as...
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item">
                    Clear
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item">
                    Exit
                </a>
            </div>
        </div>
    );
};

export default Canvas;
