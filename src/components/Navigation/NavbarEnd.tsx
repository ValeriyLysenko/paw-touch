import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props {}

const NavbarEnd: FC<Props> = () => (
    <div className="navbar-end">
        <div className="navbar-item">
            <div className="buttons">
                <Link to="/gallery" className="button is-info">
                    Gallery
                </Link>
                <a className="button is-warning">
                    Settings
                </a>
            </div>
        </div>
    </div>
);

export default NavbarEnd;
