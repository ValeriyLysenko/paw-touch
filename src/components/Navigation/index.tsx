import { FC } from 'react';
import routes from 'routes';
import NavMenuSection from './NavMenuSection';
import NavbarBrand from './NavbarBrand';
import NavbarEnd from './NavbarEnd';

interface Props {}

const Navigation: FC<Props> = () => {
    console.log('Navigation');
    const {
        canvas,
        layout,
        tools,
    } = routes;
    return (
        <nav className="navbar is-light pt-main-navigation" role="navigation" aria-label="main navigation">
            <NavbarBrand />
            <div id="pt-navbar" className="navbar-menu">
                <div className="navbar-start">
                    <NavMenuSection routes={canvas} />
                    <NavMenuSection routes={layout} />
                    <NavMenuSection routes={tools} nosubmenu />
                </div>
                <NavbarEnd />
            </div>
        </nav>
    );
};

export default Navigation;
