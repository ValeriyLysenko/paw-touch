import { FC } from 'react';
import NavItem from './NavItem';
import NavItemWithChildren from './NavItemWithChildren';

interface Props {
    routes: NavRouterObj;
    handlers?: {
        [name:string]: HandlerFunc;
    }
}

const NavMenuSection: FC<Props> = ({
    routes,
    handlers,
}) => {
    const {
        id, name, title, url, sublevel, dataType,
    } = routes;
    const items = sublevel ? Object.values(sublevel) : [];
    if (!items.length) {
        const navItemProps = {
            id, name, title, url, dataType, handlers,
        };
        return (
            <NavItem {...navItemProps} />
        );
    }

    return (
        <div className="navbar-item has-dropdown is-hoverable">
            <a
                className="navbar-link"
                title={title}
                // !Bulma bug fix (dropdown menu doesn't disappear after menu item clicking)
                onMouseEnter={(e) => {
                    const target = e.target as HTMLDivElement;
                    if (target) {
                        const next = target.nextSibling as HTMLDivElement;
                        if (next) next.setAttribute('style', '');
                    }
                }}
            >
                {name}
            </a>

            <div className="navbar-dropdown">
                {
                    items.length && items.map((item: NavRouterObj) => (
                        item.sublevel
                            ? <NavItemWithChildren key={item.id} {...item} handlers={handlers} />
                            : <NavItem key={item.id} {...item} handlers={handlers} />
                    ))
                }
            </div>
        </div>
    );
};

export default NavMenuSection;
