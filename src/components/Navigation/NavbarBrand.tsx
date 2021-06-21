import {
    FC, useEffect, useRef, useState,
} from 'react';
import Logo from 'atomicComponents/SVG/Logo';

interface Props {}

const NavbarBrand: FC<Props> = () => {
    const logoRef = useRef<SVGSVGElement | null>(null);
    const [animeObj, setAnimeObj] = useState({
        onLogo: false,
        animeClass: '',
    });

    useEffect(() => {
        const { current: logo } = logoRef;

        if (!logo) return;

        const animeIterationCallback = () => {
            setTimeout(() => {
                if (!animeObj.onLogo) {
                    setAnimeObj({
                        ...animeObj,
                        animeClass: '',
                    });
                }
            }, 200);
        };
        const animeMouseEnterCallback = () => {
            setAnimeObj({
                onLogo: true,
                animeClass: 'logo-anime',
            });
        };
        const animeMouseLeaveCallback = () => {
            setAnimeObj({
                ...animeObj,
                onLogo: false,
            });
        };

        logo.addEventListener('animationiteration', animeIterationCallback);
        logo.addEventListener('mouseenter', animeMouseEnterCallback);
        logo.addEventListener('mouseleave', animeMouseLeaveCallback);

        return () => {
            logo.removeEventListener('animationiteration', animeIterationCallback);
            logo.removeEventListener('mouseenter', animeMouseEnterCallback);
            logo.removeEventListener('mouseleave', animeMouseLeaveCallback);
        };
    }, [animeObj]);

    return (
        <div className="navbar-brand">
            <a id="pt-logo-svg" className="navbar-item pt-helper-no-bg" href="/">
                {/* <span id="pt-logo" /> */}
                <Logo
                    ref={logoRef}
                    {...{
                        cssClass: animeObj.animeClass,
                    }}
                />

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

export default NavbarBrand;
