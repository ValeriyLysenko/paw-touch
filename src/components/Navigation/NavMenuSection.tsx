import { FC } from 'react';
import NavItem from './NavItem';
import NavItemWithChildren from './NavItemWithChildren';

interface Props {
    routes: NavRouterObj;
}

const NavMenuSection: FC<Props> = ({
    routes,
}) => {
    console.log('Canvas', routes);
    const {
        id, name, title, url, sublevel,
    } = routes;
    const items = sublevel ? Object.values(sublevel) : [];

    if (!items.length) {
        return (
            <NavItem {...{
                id, name, title, url,
            }}
            />
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
                        item.sublevel ? <NavItemWithChildren key={item.id} {...item} /> : <NavItem key={item.id} {...item} />
                    ))
                }
            </div>
        </div>
    );
};

export default NavMenuSection;
