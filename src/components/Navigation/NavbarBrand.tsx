import { FC } from 'react';

interface Props {}

const Layout: FC<Props> = () => {
    console.log('ccc');
    return (
        <div className="navbar-brand">
            <a className="navbar-item pt-helper-no-bg" href="/">
                <span id="pt-logo" />
                {/* <svg id="pt-logo">
                    <circle id="pt-logo-dummy" cx="30" cy="30" r="28" stroke="#fff" strokeWidth="2" fill="#f5b041">
                         <animate
                            attributeType="CSS"
                            attributeName="opacity"
                            from="1"
                            to="0"
                            dur="5s"
                            fill="freeze"
                            repeatCount="indefinite"
                        />
                        <animate
                            attributeType="CSS"
                            attributeName="opacity"
                            from="0"
                            to="1"
                            dur="5s"
                            fill="freeze"
                            repeatCount="indefinite"
                            begin="5s"
                        />
                    </circle>
                </svg> */}
            </a>

            <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="pt-navbar">
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
            </a>
        </div>
    );
};

export default Layout;
