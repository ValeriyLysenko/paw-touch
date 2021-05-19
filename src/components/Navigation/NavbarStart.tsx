import { FC } from 'react';
import routes from 'routes';
import NavMenuSection from './NavMenuSection';

interface Props {}

const NavbarStart: FC<Props> = () => {
    const {
        canvas,
        layout,
        tools,
    } = routes;
    return (
        <div className="navbar-start">
            <NavMenuSection routes={canvas} />
            <NavMenuSection routes={layout} />
            <NavMenuSection routes={tools} />
        </div>
    );
};

export default NavbarStart;
