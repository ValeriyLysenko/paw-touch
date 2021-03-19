import { FC } from 'react';

interface Props {}

const Layout: FC<Props> = () => {
    console.log('ccc');
    return (
        <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
                Layout
            </a>

            <div className="navbar-dropdown">
                <a className="navbar-item">
                    Full screen
                </a>
                <a className="navbar-item">
                    Vertical split
                </a>
                <a className="navbar-item">
                    Horizontal split
                </a>
            </div>
        </div>
    );
};

export default Layout;
