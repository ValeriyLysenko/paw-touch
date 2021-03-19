import { FC } from 'react';

interface Props {}

const Layout: FC<Props> = () => {
    console.log('ccc');
    return (
        <div className="navbar-brand">
            <a className="navbar-item pt-helper-no-bg" href="https://bulma.io">
                {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" alt="" /> */}
                <svg width="60" height="60">
                    <circle cx="30" cy="30" r="28" stroke="#fff" strokeWidth="2" fill="#f5b041" />
                </svg>
            </a>

            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
            </a>
        </div>
    );
};

export default Layout;
