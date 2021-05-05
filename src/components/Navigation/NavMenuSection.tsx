import { FC } from 'react';
import NavItem from './NavItem';

interface Props {
    routes: NavRouterObj;
    nosubmenu?: boolean;
}

const NavMenuSection: FC<Props> = ({
    routes,
    nosubmenu,
}) => {
    console.log('Canvas', routes);
    const { root, children } = routes;
    const items = children ? Object.values(children) : [];

    if (nosubmenu) {
        return <NavItem {...root} />;
    }

    return (
        <div className="navbar-item has-dropdown is-hoverable">
            <a
                className="navbar-link"
                title={root.title}
                // !Bulma bug fix (dropdown menu doesn't disappear after menu item clicking)
                onMouseEnter={(e) => {
                    const target = e.target as HTMLDivElement;
                    if (target) {
                        const next = target.nextSibling as HTMLDivElement;
                        if (next) next.setAttribute('style', '');
                    }
                }}
            >
                {root.name}
            </a>

            <div className="navbar-dropdown">
                {
                items.length && items.map((item: NavLinkObj) => (
                    <NavItem key={item.id} {...item} />
                ))
            }
            </div>
        </div>
    );
};

export default NavMenuSection;
