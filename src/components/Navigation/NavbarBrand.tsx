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
                <Logo
                    ref={logoRef}
                    {...{
                        cssClass: animeObj.animeClass,
                    }}
                />
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
