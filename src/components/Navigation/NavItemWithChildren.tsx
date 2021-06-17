import { FC } from 'react';
import NavItem from './NavItem';

interface Props extends NavRouterObj {
    handlers?: {
        [name:string]: HandlerFunc;
    };
}

const NavItemWithsublevel: FC<Props> = ({
    name, sublevel, handlers,
}) => {
    const items = sublevel ? Object.values(sublevel) : [];
    return (
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
                                item.sublevel
                                    ? <NavItemWithsublevel key={item.id} {...item} handlers={handlers} />
                                    : <NavItem key={item.id} {...item} handlers={handlers} />
                            ))
                        }
                </div>
            </div>
        </div>
    );
};

export default NavItemWithsublevel;
