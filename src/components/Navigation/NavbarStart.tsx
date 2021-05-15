import { FC } from 'react';
import routes from 'routes';
import NavMenuSection from './NavMenuSection';

interface Props {}

const NavbarStart: FC<Props> = () => {
    console.log('Navigation');
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

            {/* <a className="navbar-item">
                Home
            </a>
            <div className="navbar-item has-dropdown is-hoverable">
                <a className="navbar-link">
                    More
                </a>
                <div className="navbar-dropdown">
                    <div className="nested dropdown">
                        <a className="navbar-item">
                            <span className="icon-text ">
                                <span>Dropdown</span>
                                <span className="icon">
                                    <i className="fas fa-chevron-right" />
                                </span>
                            </span>
                        </a>

                        <div className="dropdown-menu" id="dropdown-menu" role="menu">
                            <div className="dropdown-content">
                                <a href="/" className="dropdown-item">
                                    Dropdown item
                                </a>
                                <a className="dropdown-item">
                                    Other dropdown item
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default NavbarStart;
