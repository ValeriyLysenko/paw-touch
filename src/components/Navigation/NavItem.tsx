import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props extends NavRouterObj {}

const NavItem: FC<Props> = ({
    name, title, url,
}) => {
    console.log('NavItem', name);
    return (
        <Link
            to={url}
            className="navbar-item"
            title={title}
            // !Bulma bug fix (dropdown menu doesn't disappear after menu item clicking)
            onClick={(e) => {
                const target = e.target as HTMLDivElement;
                if (target) {
                    const closest = target.closest('.navbar-dropdown') as HTMLDivElement;
                    if (closest) closest.style.display = 'none';
                }
            }}
        >
            {name}
        </Link>
    );
};

export default NavItem;
