import { FC } from 'react';
import { Link } from 'react-router-dom';
import NavItem from './NavItem';

interface Props extends NavRouterObj {}

const NavItemWithsublevel: FC<Props> = ({
    name, title, url, sublevel,
}) => {
    console.log('NavItem', name);
    const items = sublevel ? Object.values(sublevel) : [];
    return (
    // <div className="navbar-item has-dropdown is-hoverable">
    //     <a className="navbar-link">
    //         {name}
    //     </a>
    // <div className="navbar-dropdown">
        <div className="nested dropdown">
            <a className="navbar-item">
                <span className="icon-text ">
                    <span>{name}</span>
                    <span className="icon">
                        <i className="fas fa-chevron-right" />
                    </span>
                </span>
            </a>

            <div className="dropdown-menu" role="menu">
                <div className="dropdown-content">
                    {
                            items.length && items.map((item: NavRouterObj) => (
                                item.sublevel ? <NavItemWithsublevel key={item.id} {...item} /> : <NavItem key={item.id} {...item} />
                            ))
                        }
                    {/* <a href="/" className="dropdown-item">
                                Dropdown item
                            </a>
                            <a className="dropdown-item">
                                Other dropdown item
                            </a> */}
                </div>
            </div>
        </div>
    // </div>
    // </div>

    // <Link
    //     to={url}
    //     className="navbar-item"
    //     title={title}
    //     // !Bulma bug fix (dropdown menu doesn't disappear after menu item clicking)
    //     onClick={(e) => {
    //         const target = e.target as HTMLDivElement;
    //         if (target) {
    //             const closest = target.closest('.navbar-dropdown') as HTMLDivElement;
    //             if (closest) closest.style.display = 'none';
    //         }
    //     }}
    // >
    //     {name}
    // </Link>
    );
};

export default NavItemWithsublevel;
