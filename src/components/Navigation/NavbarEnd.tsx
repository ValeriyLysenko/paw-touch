import { FC } from 'react';

interface Props {}

const NavbarEnd: FC<Props> = () => (
    <div className="navbar-end">
        <div className="navbar-item">
            <div className="buttons">
                <a className="button is-info">
                    Gallery
                </a>
                <a className="button is-warning">
                    Settings
                </a>
            </div>
        </div>
    </div>
);

export default NavbarEnd;
