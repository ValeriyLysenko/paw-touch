import { FC } from 'react';
import { Link } from 'react-router-dom';

interface Props extends NavRouterObj {
    handlers?: {
        [name:string]: HandlerFunc;
    };
}

const NavItem: FC<Props> = ({
    name, title, url, dataType, handler, handlers,
}) => {
    const handlerFunc = handlers && handler && handlers[handler];
    return (
        <Link
            to={url}
            className="navbar-item"
            title={title}
            // !Bulma bug fix (dropdown menu doesn't disappear after menu item clicking)
            onClick={(e) => {
                e.stopPropagation();
                const target = e.target as HTMLDivElement;
                if (target) {
                    const closest = target.closest('.navbar-dropdown') as HTMLDivElement;
                    if (closest) closest.style.display = 'none';
                }
                // Handle link click
                console.log('INSIDE CLICK', dataType, handlerFunc);
                if (handlerFunc) handlerFunc(e);
            }}
            {...(dataType && { 'data-type': dataType })}
        >
            {name}
        </Link>
    );
};

export default NavItem;
