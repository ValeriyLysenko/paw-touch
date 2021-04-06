import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props extends NavLinkObj {}

const NavItem: FC<Props> = ({
    id, name, title, url,
}) => {
    console.log('NavItem', title);
    return (
        <Link
            to={url}
            title={title}
            className="navbar-item"
        >
            {name}
        </Link>
    );
};

export default NavItem;
