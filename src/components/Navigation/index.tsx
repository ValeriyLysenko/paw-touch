import { FC } from 'react';
import NavbarBrand from './NavbarBrand';
import NavbarStart from './NavbarStart';
import NavbarEnd from './NavbarEnd';
import ToolSettings from './ToolSettings';

interface Props {}

const Navigation: FC<Props> = () => {
    console.log('Navigation');
    return (
        <nav className="navbar is-light pt-main-navigation" role="navigation" aria-label="main navigation">
            <NavbarBrand />
            <div id="pt-navbar" className="navbar-menu">
                <NavbarStart />
                <ToolSettings />
                <NavbarEnd />
            </div>
        </nav>
    );
};

export default Navigation;
