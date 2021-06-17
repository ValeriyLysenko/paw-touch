import { FC, useRef } from 'react';
import { NavigationContextProvider } from 'aux/NavigationContext';
import NavbarBrand from './NavbarBrand';
import NavbarStart from './NavbarStart';
import NavbarEnd from './NavbarEnd';

interface Props {}

const Navigation: FC<Props> = () => {
    console.log('Navigation');
    const saveToGalleryModalRef = useRef(null);
    const saveToGalleryPropmptModalRef = useRef(null);
    return (
        <NavigationContextProvider value={{
            saveToGalleryModalRef,
            saveToGalleryPropmptModalRef,
        }}
        >
            <nav className="navbar is-light pt-main-navigation" role="navigation" aria-label="main navigation">
                <NavbarBrand />
                <div id="pt-navbar" className="navbar-menu">
                    <NavbarStart />
                    <NavbarEnd />
                </div>
            </nav>
        </NavigationContextProvider>
    );
};

export default Navigation;
