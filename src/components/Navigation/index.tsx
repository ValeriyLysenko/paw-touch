import { FC } from 'react';
import Canvas from './Canvas';
import Layout from './Layout';
import Tools from './Tools';
import NavbarBrand from './NavbarBrand';
import NavbarEnd from './NavbarEnd';

interface Props {}

const Navigation: FC<Props> = () => {
    console.log('ccc');
    return (
        <nav className="navbar is-light pt-main-navigation" role="navigation" aria-label="main navigation">
            <NavbarBrand />
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <Canvas />
                    <Layout />
                    <Tools />
                </div>
                <NavbarEnd />
            </div>
        </nav>
    );
};

export default Navigation;
