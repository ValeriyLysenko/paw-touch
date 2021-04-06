import { FC } from 'react';
import NavItem from './NavItem';

interface Props {
    routes: NavRouterObj
}

const Canvas: FC<Props> = ({
    routes,
}) => {
    console.log('Canvas', routes);
    const { root, children } = routes;
    const items = Object.values(children);
    return (
        <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link" title={root.name}>
                {root.name}
            </a>
            <div className="navbar-dropdown">
                {
                items.length && items.map((item: NavLinkObj) => (
                    <NavItem key={item.id} {...item} />
                    // <a
                    //     key={item.id}
                    //     title={item.title}
                    //     className="navbar-item"
                    // >
                    //     <Link to={item.url}>{item.name}</Link>
                    // </a>
                ))
            }
            </div>

            {/* <div className="navbar-dropdown">
                <a className="navbar-item">
                    New canvas
                </a>
                <a className="navbar-item">
                    Save
                </a>
                <a className="navbar-item">
                    Save as...
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item">
                    Clear
                </a>
                <hr className="navbar-divider" />
                <a className="navbar-item">
                    Exit
                </a>
            </div> */}
        </div>
    );
};

export default Canvas;
